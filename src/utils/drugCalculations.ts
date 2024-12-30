export const calculateDrugDose = (weight: string, drugDose: string) => {
  if (!weight || !drugDose) return null;

  let doseInfo = "";
  
  if (drugDose.includes("/kg")) {
    const baseValue = drugDose.match(/(\d+(-\d+)?)/)?.[0] || "";
    const unit = drugDose.match(/[a-zA-Z]+\/kg/)?.[0].replace("/kg", "") || "";
    
    if (baseValue.includes("-")) {
      const [min, max] = baseValue.split("-");
      doseInfo += `Calculated dose range:\n`;
      doseInfo += `${(parseFloat(min) * parseFloat(weight)).toFixed(1)} ${unit} - `;
      doseInfo += `${(parseFloat(max) * parseFloat(weight)).toFixed(1)} ${unit}\n`;
    } else {
      const value = parseFloat(baseValue);
      doseInfo += `Calculated dose: ${(value * parseFloat(weight)).toFixed(1)} ${unit}\n`;
    }
  }
  
  return doseInfo;
};