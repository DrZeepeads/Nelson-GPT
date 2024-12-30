export interface Drug {
  name: string;
  dose: string;
}

export const nutritionDrugs: Drug[] = [
  { name: "Oral rehydration salts (ORS)", dose: "50-100 mL/kg over 4-6 hours" },
  { name: "Folic acid", dose: "1 mg/day" },
  { name: "Iron sulfate", dose: "3-6 mg/kg/day" },
  { name: "Vitamin D (Cholecalciferol)", dose: "400-1000 IU/day" },
  { name: "Vitamin B12 (Cyanocobalamin)", dose: "1000 mcg IM weekly" },
  { name: "Calcium carbonate", dose: "500-1500 mg/day" },
  { name: "Magnesium sulfate", dose: "1-2 g IV over 1-2 hours" },
  { name: "Zinc sulfate", dose: "10-20 mg/day" },
  { name: "MCT oil", dose: "1-2 g/kg/day" },
  { name: "Glucose solution (Dextrose)", dose: "2-5 mL/kg" },
  { name: "Sodium chloride", dose: "1-2 mL/kg" },
  { name: "L-carnitine", dose: "50-100 mg/kg/day" },
];

export const endocrineDrugs: Drug[] = [
  { name: "Levothyroxine", dose: "1.5-2 mcg/kg/day" },
  { name: "Methimazole", dose: "0.2-0.5 mg/kg/day" },
  { name: "Propylthiouracil (PTU)", dose: "10-15 mg/kg/day" },
  { name: "Insulin (Regular)", dose: "0.1-0.2 units/kg/day" },
  { name: "Insulin (Long-acting)", dose: "0.2-0.4 units/kg/day" },
  { name: "Insulin (Rapid-acting)", dose: "0.05-0.1 units/kg/dose" },
  { name: "Glucagon", dose: "0.5-1 mg IV/IM" },
  { name: "Fludrocortisone", dose: "0.05-0.2 mg/day" },
  { name: "Hydrocortisone", dose: "5-10 mg/m²/day" },
  { name: "Desmopressin", dose: "0.1-0.4 mg/day" },
  { name: "Bromocriptine", dose: "2.5-15 mg/day" },
  { name: "Dexamethasone", dose: "0.02-0.1 mg/kg/day" },
  { name: "Somatropin", dose: "0.16-0.33 mg/kg/week" },
  { name: "Vitamin D (Calcitriol)", dose: "0.25-0.5 mcg/day" },
  { name: "Leuprolide", dose: "0.01-0.03 mg/kg/day" },
];

export const rheumaticDrugs: Drug[] = [
  { name: "Methotrexate", dose: "10-25 mg/m² once weekly" },
  { name: "Prednisolone", dose: "1-2 mg/kg/day" },
  { name: "Hydroxychloroquine", dose: "3-6 mg/kg/day" },
  { name: "Etanercept", dose: "0.4 mg/kg twice weekly or 0.8 mg/kg weekly" },
  { name: "Adalimumab", dose: "20-40 mg every 2 weeks" },
  { name: "Sulfasalazine", dose: "30-50 mg/kg/day" },
  { name: "Aspirin", dose: "75-100 mg/kg/day" },
  { name: "Ibuprofen", dose: "5-10 mg/kg/dose every 6-8 hours" },
  { name: "Naproxen", dose: "10 mg/kg/dose every 12 hours" },
  { name: "Tocilizumab", dose: "8-12 mg/kg IV every 4 weeks" },
  { name: "Rituximab", dose: "375 mg/m² IV weekly for 4 weeks" },
  { name: "Azathioprine", dose: "1-3 mg/kg/day" },
  { name: "Mycophenolate mofetil", dose: "600-1200 mg/m²/day" },
  { name: "Cyclophosphamide", dose: "500-1000 mg/m² IV every 4 weeks" },
  { name: "Belimumab", dose: "10 mg/kg IV every 2-4 weeks" },
];

export const metabolicDrugs: Drug[] = [
  { name: "Insulin (regular)", dose: "0.1 units/kg/hour IV infusion" },
  { name: "Sodium bicarbonate", dose: "1-2 mEq/kg IV" },
  { name: "Carnitine", dose: "50-100 mg/kg/day" },
  { name: "Vitamin B1 (Thiamine)", dose: "10-50 mg/day" },
  { name: "Coenzyme Q10", dose: "5-10 mg/kg/day" },
  { name: "Sodium benzoate", dose: "250-500 mg/kg/day" },
  { name: "Arginine", dose: "200-400 mg/kg/day" },
  { name: "Dextrose (10%)", dose: "2-5 mL/kg IV bolus" },
  { name: "Biotin", dose: "5-20 mg/day" },
  { name: "Vitamin D", dose: "400-1000 IU/day" },
  { name: "Levocarnitine", dose: "100 mg/kg/day" },
  { name: "Ketogenic diet (therapy)", dose: "Managed by dietitian" },
  { name: "Ursodeoxycholic acid", dose: "10-15 mg/kg/day" },
  { name: "Pancreatic enzymes", dose: "500-2500 lipase units/kg/meal" },
];

export const fluidElectrolyteDrugs: Drug[] = [
  { name: "Sodium chloride (3%)", dose: "1-2 mL/kg IV over 10-20 min" },
  { name: "Potassium chloride", dose: "0.5-1 mEq/kg IV over 1-2 hours" },
  { name: "Calcium gluconate", dose: "50-100 mg/kg IV over 10-20 min" },
  { name: "Magnesium sulfate", dose: "25-50 mg/kg IV over 20-30 min" },
  { name: "Sodium bicarbonate", dose: "1-2 mEq/kg IV" },
  { name: "Dextrose (10%)", dose: "2-5 mL/kg IV bolus" },
  { name: "Oral rehydration salts (ORS)", dose: "50-100 mL/kg over 4-6 hours" },
  { name: "Furosemide", dose: "1-2 mg/kg IV" },
  { name: "Spironolactone", dose: "1-3 mg/kg/day" },
  { name: "Desmopressin", dose: "0.1-0.4 mg/day" },
  { name: "Albumin (20%)", dose: "1 g/kg IV over 2-4 hours" },
  { name: "Hypertonic saline", dose: "2-4 mL/kg IV bolus" },
  { name: "Phosphate", dose: "0.5-1 mmol/kg IV over 6-12 hours" },
  { name: "Insulin with dextrose", dose: "0.1 units/kg IV with dextrose" },
  { name: "Mannitol", dose: "0.25-0.5 g/kg IV over 20-30 min" },
];

export const geneticDrugs: Drug[] = [
  { name: "Enzyme replacement therapy (ERT)", dose: "Dosed based on specific genetic condition (e.g., Gaucher disease: 30-60 units/kg IV every 2 weeks)" },
  { name: "Hydroxyurea", dose: "15-25 mg/kg/day orally (for sickle cell disease)" },
  { name: "L-arginine", dose: "100-200 mg/kg/day orally (for urea cycle disorders)" },
  { name: "Sapropterin", dose: "10-20 mg/kg/day orally (for phenylketonuria)" },
  { name: "Cysteamine", dose: "60-90 mg/kg/day orally in divided doses (for nephropathic cystinosis)" },
  { name: "Alglucosidase alfa", dose: "20 mg/kg IV every 2 weeks (for Pompe disease)" },
  { name: "Deferasirox", dose: "20-40 mg/kg/day orally (for iron overload in thalassemia)" },
  { name: "Pegloticase", dose: "8 mg IV every 2 weeks (for severe gout in metabolic disorders)" },
  { name: "Nitisinone", dose: "1 mg/kg/day orally (for hereditary tyrosinemia type 1)" },
  { name: "Vitamin B6 (Pyridoxine)", dose: "5-10 mg/kg/day orally (for pyridoxine-dependent epilepsy)" },
  { name: "Betaine", dose: "6-9 g/day orally in divided doses (for homocystinuria)" },
  { name: "Carnitine", dose: "50-100 mg/kg/day orally (for primary carnitine deficiency)" },
  { name: "Biotin", dose: "5-20 mg/day orally (for biotinidase deficiency)" },
  { name: "Ursodeoxycholic acid", dose: "10-15 mg/kg/day orally (for cholestatic liver disease in genetic syndromes)" },
  { name: "Thiamine", dose: "10-50 mg/day orally (for thiamine-responsive metabolic diseases)" }
];

export const skinDrugs: Drug[] = [
  { name: "Hydrocortisone cream", dose: "Apply 1-2 times daily (for eczema)" },
  { name: "Betamethasone", dose: "Apply 1-2 times daily (for psoriasis)" },
  { name: "Mupirocin", dose: "Apply 2-3 times daily (for bacterial skin infections)" },
  { name: "Clotrimazole", dose: "Apply 2-3 times daily (for fungal infections)" },
  { name: "Aciclovir cream", dose: "Apply 5 times daily (for herpes simplex)" },
  { name: "Tacrolimus", dose: "Apply 0.03-0.1% ointment twice daily (for atopic dermatitis)" },
  { name: "Permethrin", dose: "Apply overnight and wash off (for scabies)" },
  { name: "Loratadine", dose: "5-10 mg orally once daily (for urticaria)" },
  { name: "Cetirizine", dose: "5-10 mg orally once daily (for allergies)" },
  { name: "Doxycycline", dose: "2.2 mg/kg/dose daily (for acne)" },
  { name: "Isotretinoin", dose: "0.5-1 mg/kg/day in 2 doses (for severe acne)" },
  { name: "Calamine lotion", dose: "Apply as needed (for itching)" },
  { name: "Silver sulfadiazine", dose: "Apply 1-2 times daily (for burns)" },
  { name: "Fluconazole", dose: "3-6 mg/kg/day orally (for fungal skin infections)" },
  { name: "Topical antibiotics (general)", dose: "Apply 2-3 times daily (for bacterial skin infections)" }
];

export const boneDrugs: Drug[] = [
  { name: "Calcium carbonate", dose: "500-1500 mg/day orally (for hypocalcemia)" },
  { name: "Vitamin D (Cholecalciferol)", dose: "400-1000 IU/day orally (for rickets)" },
  { name: "Alendronate", dose: "5-10 mg/day orally (for osteoporosis)" },
  { name: "Zoledronic acid", dose: "0.05 mg/kg IV once yearly (for osteogenesis imperfecta)" },
  { name: "Teriparatide", dose: "20 mcg subcutaneously daily (for severe osteoporosis)" },
  { name: "Pamidronate", dose: "1 mg/kg IV over 4 hours every 3-4 months (for bone disorders)" },
  { name: "Ibuprofen", dose: "5-10 mg/kg/dose every 6-8 hours (for bone pain)" },
  { name: "Prednisolone", dose: "1-2 mg/kg/day orally (for inflammatory bone diseases)" },
  { name: "Methotrexate", dose: "10-25 mg/m² once weekly (for juvenile idiopathic arthritis)" },
  { name: "Etanercept", dose: "0.4 mg/kg subcutaneously twice weekly (for juvenile arthritis)" },
  { name: "Denosumab", dose: "1 mg/kg subcutaneously every 6 months (for bone metastasis)" },
  { name: "Raloxifene", dose: "60 mg/day orally (for osteoporosis)" },
  { name: "Hydroxychloroquine", dose: "3-6 mg/kg/day orally (for lupus with bone involvement)" },
  { name: "Calcitonin", dose: "50-100 units subcutaneously daily (for hypercalcemia)" },
  { name: "Bisphosphonates (general)", dose: "10-50 mg orally weekly (for osteoporosis)" }
];
