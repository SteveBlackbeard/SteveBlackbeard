// NULLA-LABS IUPAC 3D MOLECULAR SYNTHESIS PLATFORM — PUBCHEM REST API CLIENT
// Frugal, Local-First PubChem PUG REST API query engine with client caching

const pubchemCache = {};

export async function fetchPubChemCompoundData(compoundName) {
  if (!compoundName) return null;
  const key = String(compoundName).trim().toLowerCase();

  if (pubchemCache[key]) {
    return pubchemCache[key];
  }

  const url = `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${encodeURIComponent(key)}/property/MolecularFormula,MolecularWeight,IUPACName,CanonicalSMILES/JSON`;

  try {
    const response = await fetch(url);
    if (!response.ok) return null;
    const data = await response.json();
    if (!data.PropertyTable || !data.PropertyTable.Properties || data.PropertyTable.Properties.length === 0) {
      return null;
    }

    const prop = data.PropertyTable.Properties[0];
    const result = {
      cid: prop.CID,
      formula: prop.MolecularFormula,
      weight: prop.MolecularWeight,
      iupac: prop.IUPACName,
      smiles: prop.CanonicalSMILES
    };

    pubchemCache[key] = result;
    return result;
  } catch (e) {
    console.warn("PubChem API offline/network fallback:", e);
    return null;
  }
}
