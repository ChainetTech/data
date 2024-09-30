import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import "./App.css";

const contractABI = [
		
]; // Replace with your contract ABI


const contractAddress = "YOUR_CONTRACT_ADDRESS_HERE"; //replace wih your contract address

function App() {
  const [properties, setProperties] = useState([]);
  const [newProperty, setNewProperty] = useState({
    basicInfo: { accountNo: '', ownerName: '', images: '', propertyAddress: '', city: '' },
    saleInfo: { grantor: '', grantee: '', saleDate: '', salePrice: '', saleType: '' },
    details: { acres: '', assessedValue: '', heatedSqFt: '', subdivision: '', secTwpRng: '', legalDescr: '', landSqFt: '' }
  });
  const [selectedPropertyIndex, setSelectedPropertyIndex] = useState(null);

  useEffect(() => {
    loadProperties();
  }, []);

  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  }

  async function getContract() {
    await requestAccount();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    return new ethers.Contract(contractAddress, contractABI, signer);
  }

  async function loadProperties() {
    const contract = await getContract();
    const count = await contract.getPropertyCount();
    const loadedProperties = [];

    for (let i = 0; i < count; i++) {
      const basicInfo = await contract.getPropertyBasicInfo(i);
      const saleInfo = await contract.getPropertySaleInfo(i);
      const details = await contract.getPropertyDetails(i);
      loadedProperties.push({ basicInfo, saleInfo, details });
    }

    setProperties(loadedProperties);
  }

  async function addProperty() {
    const contract = await getContract();
    await contract.addProperty(newProperty.basicInfo, newProperty.saleInfo, newProperty.details);
    await loadProperties();
    setNewProperty({
      basicInfo: { accountNo: '', ownerName: '', images: '', propertyAddress: '', city: '' },
      saleInfo: { grantor: '', grantee: '', saleDate: '', salePrice: '', saleType: '' },
      details: { acres: '', assessedValue: '', heatedSqFt: '', subdivision: '', secTwpRng: '', legalDescr: '', landSqFt: '' }
    });
  }

  async function updateProperty() {
    if (selectedPropertyIndex === null) return;

    const contract = await getContract();
    await contract.updatePropertyBasicInfo(selectedPropertyIndex, newProperty.basicInfo);
    await contract.updatePropertySaleInfo(selectedPropertyIndex, newProperty.saleInfo);
    await contract.updatePropertyDetails(selectedPropertyIndex, newProperty.details);
    await loadProperties();
    setSelectedPropertyIndex(null);
    setNewProperty({
      basicInfo: { accountNo: '', ownerName: '', images: '', propertyAddress: '', city: '' },
      saleInfo: { grantor: '', grantee: '', saleDate: '', salePrice: '', saleType: '' },
      details: { acres: '', assessedValue: '', heatedSqFt: '', subdivision: '', secTwpRng: '', legalDescr: '', landSqFt: '' }
    });
  }

  const handleInputChange = (section, field, value) => {
    setNewProperty(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const selectProperty = (index) => {
    setSelectedPropertyIndex(index);
    setNewProperty(properties[index]);
  };

  return (
    <div className="App">
      <h1>Property Records</h1>

      <h2>Properties</h2>
      {properties.map((property, index) => (
        <div key={index} onClick={() => selectProperty(index)}>
          <p>Account No: {property.basicInfo.accountNo}</p>
          <p>Owner: {property.basicInfo.ownerName}</p>
          <p>Address: {property.basicInfo.propertyAddress}</p>
        </div>
      ))}

      <h2>{selectedPropertyIndex !== null ? 'Update Property' : 'Add New Property'}</h2>
      <h3>Basic Info</h3>
      <input 
        placeholder="Account No" 
        value={newProperty.basicInfo.accountNo} 
        onChange={(e) => handleInputChange('basicInfo', 'accountNo', e.target.value)} 
      />
      <input 
        placeholder="Owner Name" 
        value={newProperty.basicInfo.ownerName} 
        onChange={(e) => handleInputChange('basicInfo', 'ownerName', e.target.value)} 
      />
      <input 
        placeholder="Images" 
        value={newProperty.basicInfo.images} 
        onChange={(e) => handleInputChange('basicInfo', 'images', e.target.value)} 
      />
      <input 
        placeholder="Property Address" 
        value={newProperty.basicInfo.propertyAddress} 
        onChange={(e) => handleInputChange('basicInfo', 'propertyAddress', e.target.value)} 
      />
      <input 
        placeholder="City" 
        value={newProperty.basicInfo.city} 
        onChange={(e) => handleInputChange('basicInfo', 'city', e.target.value)} 
      />

      <h3>Sale Info</h3>
      <input 
        placeholder="Grantor" 
        value={newProperty.saleInfo.grantor} 
        onChange={(e) => handleInputChange('saleInfo', 'grantor', e.target.value)} 
      />
      <input 
        placeholder="Grantee" 
        value={newProperty.saleInfo.grantee} 
        onChange={(e) => handleInputChange('saleInfo', 'grantee', e.target.value)} 
      />
      <input 
        type="number" 
        placeholder="Sale Date" 
        value={newProperty.saleInfo.saleDate} 
        onChange={(e) => handleInputChange('saleInfo', 'saleDate', e.target.value)} 
      />
      <input 
        type="number" 
        placeholder="Sale Price" 
        value={newProperty.saleInfo.salePrice} 
        onChange={(e) => handleInputChange('saleInfo', 'salePrice', e.target.value)} 
      />
      <input 
        placeholder="Sale Type" 
        value={newProperty.saleInfo.saleType} 
        onChange={(e) => handleInputChange('saleInfo', 'saleType', e.target.value)} 
      />

      <h3>Property Details</h3>
      <input 
        type="number" 
        placeholder="Acres" 
        value={newProperty.details.acres} 
        onChange={(e) => handleInputChange('details', 'acres', e.target.value)} 
      />
      <input 
        type="number" 
        placeholder="Assessed Value" 
        value={newProperty.details.assessedValue} 
        onChange={(e) => handleInputChange('details', 'assessedValue', e.target.value)} 
      />
      <input 
        type="number" 
        placeholder="Heated Sq Ft" 
        value={newProperty.details.heatedSqFt} 
        onChange={(e) => handleInputChange('details', 'heatedSqFt', e.target.value)} 
      />
      <input 
        placeholder="Subdivision" 
        value={newProperty.details.subdivision} 
        onChange={(e) => handleInputChange('details', 'subdivision', e.target.value)} 
      />
      <input 
        placeholder="Sec Twp Rng" 
        value={newProperty.details.secTwpRng} 
        onChange={(e) => handleInputChange('details', 'secTwpRng', e.target.value)} 
      />
      <input 
        placeholder="Legal Description" 
        value={newProperty.details.legalDescr} 
        onChange={(e) => handleInputChange('details', 'legalDescr', e.target.value)} 
      />
      <input 
        type="number" 
        placeholder="Land Sq Ft" 
        value={newProperty.details.landSqFt} 
        onChange={(e) => handleInputChange('details', 'landSqFt', e.target.value)} 
      />

      {selectedPropertyIndex !== null ? (
        <button onClick={updateProperty}>Update Property</button>
      ) : (
        <button onClick={addProperty}>Add Property</button>
      )}
    </div>
  );
}

export default App;