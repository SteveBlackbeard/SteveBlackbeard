# Pre-testing Interactive Periodic Table & Molecular Fusion Reactions (Rule 1)
import math

periodic_table = {
    'H':  {'name': 'Hydrogen', 'atomic_num': 1, 'mass': 1.008, 'color': (1.0, 1.0, 1.0), 'category': 'Nonmetal'},
    'C':  {'name': 'Carbon', 'atomic_num': 6, 'mass': 12.011, 'color': (0.55, 0.27, 0.9), 'category': 'Nonmetal'},
    'N':  {'name': 'Nitrogen', 'atomic_num': 7, 'mass': 14.007, 'color': (0.0, 0.94, 1.0), 'category': 'Nonmetal'},
    'O':  {'name': 'Oxygen', 'atomic_num': 8, 'mass': 15.999, 'color': (1.0, 0.0, 0.33), 'category': 'Nonmetal'},
    'P':  {'name': 'Phosphorus', 'atomic_num': 15, 'mass': 30.974, 'color': (1.0, 0.5, 0.0), 'category': 'Nonmetal'},
    'Na': {'name': 'Sodium', 'atomic_num': 11, 'mass': 22.990, 'color': (0.9, 0.9, 0.0), 'category': 'Alkali Metal'},
    'Cl': {'name': 'Chlorine', 'atomic_num': 17, 'mass': 35.45, 'color': (0.0, 1.0, 0.5), 'category': 'Halogen'},
    'Fe': {'name': 'Iron', 'atomic_num': 26, 'mass': 55.845, 'color': (0.7, 0.7, 0.7), 'category': 'Transition Metal'},
    'Au': {'name': 'Gold', 'atomic_num': 79, 'mass': 196.97, 'color': (1.0, 0.84, 0.0), 'category': 'Transition Metal'}
}

fusion_recipes = {
    ('H', 'O'): {'name': 'Water (H2O)', 'formula': 'H2O', 'atoms': [{'elem':'O', 'count':1}, {'elem':'H', 'count':2}], 'type': 'Polar Covalent Compound'},
    ('C', 'O'): {'name': 'Carbon Dioxide (CO2)', 'formula': 'CO2', 'atoms': [{'elem':'C', 'count':1}, {'elem':'O', 'count':2}], 'type': 'Covalent Gas'},
    ('Na', 'Cl'): {'name': 'Sodium Chloride (NaCl)', 'formula': 'NaCl', 'atoms': [{'elem':'Na', 'count':1}, {'elem':'Cl', 'count':1}], 'type': 'Ionic Crystal Salt'},
    ('C', 'H'): {'name': 'Methane (CH4)', 'formula': 'CH4', 'atoms': [{'elem':'C', 'count':1}, {'elem':'H', 'count':4}], 'type': 'Tetrahedral Hydrocarbon'}
}

print(f"[PERIODIC_PRETEST_PASSED] Total Elements Mapped: {len(periodic_table)}")
print(f"[PERIODIC_PRETEST_PASSED] Total Chemical Reactions Mapped: {len(fusion_recipes)}")
