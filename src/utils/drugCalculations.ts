export const calculateDrugDose = (weight: string, drugDose: string) => {
  if (!weight || !drugDose) return null;

  let doseInfo = "";
  
  if (drugDose.includes("/kg")) {
    const baseValue = drugDose.match(/(\d+(-\d+)?)/)?.[0] || "";
    const unit = drugDose.match(/[a-zA-Z]+\/kg/)?.[0].replace("/kg", "") || "";
    
    if (baseValue.includes("-")) {
      const [min, max] = baseValue.split("-");
      const minCalc = (parseFloat(min) * parseFloat(weight)).toFixed(2);
      const maxCalc = (parseFloat(max) * parseFloat(weight)).toFixed(2);
      
      doseInfo += `Calculated dose range:\n`;
      doseInfo += `${minCalc} ${unit} - ${maxCalc} ${unit}\n`;
      
      // Add per-dose breakdown if multiple daily doses
      if (drugDose.toLowerCase().includes("divided")) {
        const doses = drugDose.match(/(\d+)\s*doses/)?.[1] || "2";
        const minPerDose = (parseFloat(minCalc) / parseInt(doses)).toFixed(2);
        const maxPerDose = (parseFloat(maxCalc) / parseInt(doses)).toFixed(2);
        doseInfo += `\nPer dose (${doses} times daily):\n`;
        doseInfo += `${minPerDose} ${unit} - ${maxPerDose} ${unit}`;
      }
    } else {
      const value = parseFloat(baseValue);
      const totalDose = (value * parseFloat(weight)).toFixed(2);
      doseInfo += `Total daily dose: ${totalDose} ${unit}\n`;
      
      // Add per-dose breakdown if multiple daily doses
      if (drugDose.toLowerCase().includes("divided")) {
        const doses = drugDose.match(/(\d+)\s*doses/)?.[1] || "2";
        const perDose = (parseFloat(totalDose) / parseInt(doses)).toFixed(2);
        doseInfo += `\nPer dose (${doses} times daily):\n`;
        doseInfo += `${perDose} ${unit}`;
      }
    }
  } else {
    doseInfo += "Fixed dose medication (not weight-based)\n";
    doseInfo += drugDose;
  }
  
  return doseInfo;
};