// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PropertyRecords {
    struct PropertyBasicInfo {
        string accountNo;
        string ownerName;
        string images;
        string propertyAddress;
        string city;
    }

    struct PropertySaleInfo {
        string grantor;
        string grantee;
        uint256 saleDate;
        uint256 salePrice;
        string saleType;
    }

    struct PropertyDetails {
        uint256 acres;
        uint256 assessedValue;
        uint256 heatedSqFt;
        string subdivision;
        string secTwpRng;
        string legalDescr;
        uint256 landSqFt;
    }

    struct Property {
        PropertyBasicInfo basicInfo;
        PropertySaleInfo saleInfo;
        PropertyDetails details;
    }

    Property[] public properties;
    address public owner;

    event PropertyAdded(uint256 indexed index, string accountNo, string ownerName);

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the contract owner can call this function");
        _;
    }

    function addProperty(
        PropertyBasicInfo memory _basicInfo,
        PropertySaleInfo memory _saleInfo,
        PropertyDetails memory _details
    ) public onlyOwner {
        Property memory newProperty = Property(_basicInfo, _saleInfo, _details);
        properties.push(newProperty);
        emit PropertyAdded(properties.length - 1, _basicInfo.accountNo, _basicInfo.ownerName);
    }

    function getPropertyCount() public view returns (uint256) {
        return properties.length;
    }

    function getPropertyBasicInfo(uint256 index) public view returns (PropertyBasicInfo memory) {
        require(index < properties.length, "Property does not exist");
        return properties[index].basicInfo;
    }

    function getPropertySaleInfo(uint256 index) public view returns (PropertySaleInfo memory) {
        require(index < properties.length, "Property does not exist");
        return properties[index].saleInfo;
    }

    function getPropertyDetails(uint256 index) public view returns (PropertyDetails memory) {
        require(index < properties.length, "Property does not exist");
        return properties[index].details;
    }

    function updatePropertyBasicInfo(uint256 index, PropertyBasicInfo memory _basicInfo) public onlyOwner {
        require(index < properties.length, "Property does not exist");
        properties[index].basicInfo = _basicInfo;
    }

    function updatePropertySaleInfo(uint256 index, PropertySaleInfo memory _saleInfo) public onlyOwner {
        require(index < properties.length, "Property does not exist");
        properties[index].saleInfo = _saleInfo;
    }

    function updatePropertyDetails(uint256 index, PropertyDetails memory _details) public onlyOwner {
        require(index < properties.length, "Property does not exist");
        properties[index].details = _details;
    }
}