import json, re

with open('trade/trade.jsonl', 'r', encoding='utf-8') as f:
    data = json.load(f)

errors = []

def walk(comps):
    for c in comps:
        if c.get('type') in ('datagrid', 'editgrid'):
            grid_key = c.get('key', '')
            # All child field keys
            child_keys = {ch.get('key') for ch in c.get('components', [])}

            # Find child with logic
            for child in c.get('components', []):
                for lg in child.get('logic', []):
                    if lg.get('name') != 'disCheck':
                        continue
                    js = lg['trigger']['javascript']
                    # Extract referenced data keys: data.GRID[i].KEY
                    refs = re.findall(rf'data\.{re.escape(grid_key)}\[i\]\.(\w+)', js)
                    for ref in refs:
                        if ref not in child_keys:
                            errors.append({
                                'grid': grid_key,
                                'amount_field': child.get('key'),
                                'wrong_ref': ref,
                                'actual_children': sorted(child_keys)
                            })

        walk(c.get('components', []))
        for col in c.get('columns', []):
            walk(col.get('components', []))

walk(data.get('components', []))

if errors:
    print(f"Found {len(errors)} wrong key reference(s):\n")
    for e in errors:
        print(f"  Grid:         {e['grid']}")
        print(f"  Amount field: {e['amount_field']}")
        print(f"  Wrong ref:    {e['wrong_ref']}")
        print(f"  Actual keys:  {e['actual_children']}")
        print()
else:
    print("All field key references are correct!")
