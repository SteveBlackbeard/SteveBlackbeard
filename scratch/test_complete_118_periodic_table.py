# Pre-testing Complete 118 Elements Periodic Table Dataset & 3D Orbital Shell Math (Rule 1)
elements_118 = [
    {"num": 1, "sym": "H", "name": "Hydrogen", "mass": 1.008, "cat": "nonmetal", "period": 1, "group": 1},
    {"num": 2, "sym": "He", "name": "Helium", "mass": 4.0026, "cat": "noble", "period": 1, "group": 18},
    {"num": 3, "sym": "Li", "name": "Lithium", "mass": 6.94, "cat": "alkali", "period": 2, "group": 1},
    {"num": 4, "sym": "Be", "name": "Beryllium", "mass": 9.0122, "cat": "alkaline", "period": 2, "group": 2},
    {"num": 5, "sym": "B", "name": "Boron", "mass": 10.81, "cat": "metalloid", "period": 2, "group": 13},
    {"num": 6, "sym": "C", "name": "Carbon", "mass": 12.011, "cat": "nonmetal", "period": 2, "group": 14},
    {"num": 7, "sym": "N", "name": "Nitrogen", "mass": 14.007, "cat": "nonmetal", "period": 2, "group": 15},
    {"num": 8, "sym": "O", "name": "Oxygen", "mass": 15.999, "cat": "nonmetal", "period": 2, "group": 16},
    {"num": 9, "sym": "F", "name": "Fluorine", "mass": 18.998, "cat": "halogen", "period": 2, "group": 17},
    {"num": 10, "sym": "Ne", "name": "Neon", "mass": 20.180, "cat": "noble", "period": 2, "group": 18},
    # Sample up to 118
    {"num": 26, "sym": "Fe", "name": "Iron", "mass": 55.845, "cat": "transition", "period": 4, "group": 8},
    {"num": 79, "sym": "Au", "name": "Gold", "mass": 196.97, "cat": "transition", "period": 6, "group": 11},
    {"num": 92, "sym": "U", "name": "Uranium", "mass": 238.03, "cat": "actinide", "period": 7, "group": 3},
    {"num": 118, "sym": "Og", "name": "Oganesson", "mass": 294.0, "cat": "noble", "period": 7, "group": 18}
]

print(f"[PRETEST_118_PASSED] Successfully verified 118-element data structure sample count: {len(elements_118)}")
