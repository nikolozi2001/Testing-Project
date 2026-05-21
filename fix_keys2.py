import json

with open('trade/trade.jsonl', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Map: grid_key -> (wrong_country_key, correct_country_key, wrong_currency_key, correct_currency_key)
FIXES = {
    'page2Sarkinigzo':               ('page49',  'sarkinigzo_qveyana',               'page31',  'sarkinigzo_valuta'),
    'page2msheneblobaSazgvargaret':  ('page60',  'mshenebloba_qveyana',              'page61',  'mshenebloba_valuta'),
    'page3Saavtomobilo2':            ('page87',  'page3_saavtomobilo_qveyana',        'page93',  'page3_saavtomobilo_valuta'),
    'page3Mogzauroba2':              ('page117', 'page3_mogzauroba_qveyana',          'page118', 'page3_mogzauroba_valuta'),
    'page3msheneblobaSaqartveloshi': ('page122', 'mshenebloba_saqartveloshi_qveyana', 'page123', 'mshenebloba_saqartveloshi_valuta'),
}

def fix_js(js, grid_key, wrong_country, right_country, wrong_currency, right_currency):
    """Replace ALL occurrences of wrong key references with correct ones."""
    orig = js
    js = js.replace(f'data.{grid_key}[i].{wrong_country}', f'data.{grid_key}[i].{right_country}')
    js = js.replace(f'data.{grid_key}[i].{wrong_currency}', f'data.{grid_key}[i].{right_currency}')
    return js, js != orig

def walk(comps):
    fixed = []
    for c in comps:
        if c.get('type') in ('datagrid', 'editgrid'):
            grid_key = c.get('key', '')
            if grid_key not in FIXES:
                # Still recurse into children
                fixed += walk(c.get('components', []))
                for col in c.get('columns', []):
                    fixed += walk(col.get('components', []))
                continue

            wrong_country, right_country, wrong_currency, right_currency = FIXES[grid_key]

            for child in c.get('components', []):
                comp_changed = False

                # Fix logic trigger JS
                for lg in child.get('logic', []):
                    if lg.get('name') != 'disCheck':
                        continue
                    js = lg['trigger']['javascript']
                    new_js, ch = fix_js(js, grid_key, wrong_country, right_country, wrong_currency, right_currency)
                    if ch:
                        lg['trigger']['javascript'] = new_js
                        comp_changed = True

                # Fix validate.custom
                custom = child.get('validate', {}).get('custom', '')
                if custom:
                    new_custom, ch = fix_js(custom, grid_key, wrong_country, right_country, wrong_currency, right_currency)
                    if ch:
                        child['validate']['custom'] = new_custom
                        comp_changed = True

                if comp_changed:
                    fixed.append(f"  {grid_key} -> {child.get('key')}")

        fixed += walk(c.get('components', []))
        for col in c.get('columns', []):
            fixed += walk(col.get('components', []))
    return fixed

fixed = walk(data.get('components', []))
if fixed:
    print(f"Fixed {len(fixed)} component(s):")
    for f in fixed:
        print(f)
else:
    print("Nothing to fix.")

with open('trade/trade.jsonl', 'w', encoding='utf-8', newline='\n') as f:
    json.dump(data, f, ensure_ascii=False, indent=4)
print("Saved.")

# Verify
import subprocess
result = subprocess.run(['python', 'check_keys.py'], capture_output=True, text=True)
print("\n--- Verification ---")
print(result.stdout)
if result.stderr:
    print("STDERR:", result.stderr)
