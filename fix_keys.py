import json, re

with open('trade/trade.jsonl', 'r', encoding='utf-8') as f:
    data = json.load(f)

def get_correct_keys(child_keys):
    """From actual datagrid children, find correct country/currency keys."""
    qveyana = next((k for k in child_keys if '_qveyana' in k), None)
    valuta  = next((k for k in child_keys if '_valuta' in k), None)
    return qveyana, valuta

def fix_js(js, grid_key, child_keys):
    """Replace wrong key refs in JS using variable name (country/currency) to identify which key is which."""
    qveyana, valuta = get_correct_keys(child_keys)
    if not qveyana or not valuta:
        return js, False

    changed = False
    # Match: var country = data.GRID[i].WRONGKEY  (the key after the dot)
    # Replace WRONGKEY with the correct qveyana key
    def replace_country(m):
        nonlocal changed
        old_k = m.group(2)
        if old_k not in child_keys:
            changed = True
            return m.group(0).replace(f'.{old_k}', f'.{qveyana}')
        return m.group(0)

    def replace_currency(m):
        nonlocal changed
        old_k = m.group(2)
        if old_k not in child_keys:
            changed = True
            return m.group(0).replace(f'.{old_k}', f'.{valuta}')
        return m.group(0)

    # Fix country variable line
    js = re.sub(
        rf'(var\s+country\s*=\s*data\.{re.escape(grid_key)}\[i\]\.)(\w+)',
        replace_country, js
    )
    # Fix currency variable line
    js = re.sub(
        rf'(var\s+currency\s*=\s*data\.{re.escape(grid_key)}\[i\]\.)(\w+)',
        replace_currency, js
    )
    return js, changed


def walk(comps):
    fixed = []
    for c in comps:
        if c.get('type') in ('datagrid', 'editgrid'):
            grid_key = c.get('key', '')
            child_keys = {ch.get('key') for ch in c.get('components', [])}

            for child in c.get('components', []):
                comp_changed = False

                # Fix logic trigger JS
                for lg in child.get('logic', []):
                    if lg.get('name') != 'disCheck':
                        continue
                    new_js, ch = fix_js(lg['trigger']['javascript'], grid_key, child_keys)
                    if ch:
                        lg['trigger']['javascript'] = new_js
                        comp_changed = True

                # Fix validate.custom
                custom = child.get('validate', {}).get('custom', '')
                if custom:
                    new_custom, ch = fix_js(custom, grid_key, child_keys)
                    if ch:
                        child['validate']['custom'] = new_custom
                        comp_changed = True

                if comp_changed:
                    fixed.append(f"  {grid_key} → {child.get('key')}")

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
