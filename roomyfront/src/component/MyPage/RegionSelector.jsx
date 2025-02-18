import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import regions from "../../regions.json";

const RegionSelector = ({
  area,
  setArea,
  address,
  onClickCancel,
  onClickSave,
  setNextPossible
}) => {
  // 주소에서 시, 군, 동을 초기값으로 파싱
  const [selectedRegions, setSelectedRegions] = useState(() => {
    const [city = "", district = "", neighborhood = ""] =
    area?.split(" ") || [];
    return { city, district, neighborhood };
  });

  // 검색어 상태
  const [searchTerm, setSearchTerm] = useState("");

  // 지역 데이터
  const regionData = [...regions];

  // 시 선택 시
  const handleCitySelect = (city) => {
    setSelectedRegions({
      city,
      district: "",
      neighborhood: ""
    });
  };

  // 군/구 선택 시
  const handleDistrictSelect = (district) => {
    setSelectedRegions((prev) => ({
      ...prev,
      district,
      neighborhood: ""
    }));
  };

  // 동 선택 시
  const handleNeighborhoodSelect = (neighborhood) => {
    setSelectedRegions((prev) => ({
      ...prev,
      neighborhood
    }));
  };

  // 현재 선택된 시의 군·구 목록
  const getDistricts = () => {
    const cityObj = regionData.find(
      (city) => city.name === selectedRegions.city
    );
    return cityObj ? cityObj.children : [];
  };

  // 현재 선택된 군·구의 동 목록
  const getNeighborhoods = () => {
    const districts = getDistricts();
    const districtObj = districts.find(
      (district) => district.name === selectedRegions.district
    );
    return districtObj ? districtObj.children : [];
  };

  // 검색어로 지역 필터링
  const filterRegions = (list, type) => {
    if (!searchTerm) return list;
    const lowerSearch = searchTerm.toLowerCase();
    switch (type) {
      case "city":
        return list.filter((city) =>
          city.name.toLowerCase().includes(lowerSearch)
        );
      case "district":
        return list.filter((district) =>
          district.name.toLowerCase().includes(lowerSearch)
        );
      case "neighborhood":
        return list.filter((neighborhood) =>
          neighborhood.toLowerCase().includes(lowerSearch)
        );
      default:
        return list;
    }
  };

  // 선택된 지역이 모두 유효한지 판단하여 setNextPossible 설정
  useEffect(() => {
    const { city, district, neighborhood } = selectedRegions;
    if (!city || !district || !neighborhood) {
      setNextPossible(false);
    } else {
      setNextPossible(true);
    }
  }, [selectedRegions, setNextPossible]);

  // 최종 등록 시 area에 저장 & 부모 콜백(onClickSave) 호출
  const handleSave = () => {
    const finalArea = `${selectedRegions.city} ${selectedRegions.district} ${selectedRegions.neighborhood}`.trim();
    setArea(finalArea);
    onClickSave(finalArea);
  };

  return (
    <div className="region-selector-container">
      <h2>거주 중인 지역을 선택해주세요.</h2>

      <label className="search-container">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="지역명을 검색하세요"
          className="search-input"
        />
        <button className="search-button">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </label>

      <div className="region-selector">
        <div className="region-column">
          <h3>시 · 도</h3>
          <ul className="region-list">
            {filterRegions(regionData, "city").map((city) => (
              <li
                key={city.name}
                className={`region-item ${
                  selectedRegions.city === city.name
                    ? "selected select-item"
                    : ""
                }`}
                onClick={() => handleCitySelect(city.name)}
              >
                {city.name}
              </li>
            ))}
          </ul>
        </div>

        <div className="region-column">
          <h3>시 · 군 · 구</h3>
          <ul className="region-list">
            {selectedRegions.city &&
              filterRegions(getDistricts(), "district").map((district) => (
                <li
                  key={district.name}
                  className={`region-item ${
                    selectedRegions.district === district.name
                      ? "selected select-item"
                      : ""
                  }`}
                  onClick={() => handleDistrictSelect(district.name)}
                >
                  {district.name}
                </li>
              ))}
          </ul>
        </div>

        <div className="region-column">
          <h3>동 · 읍 · 면</h3>
          <ul className="region-list">
            {selectedRegions.district &&
              filterRegions(getNeighborhoods(), "neighborhood").map(
                (neighborhood) => (
                  <li
                    key={neighborhood}
                    className={`region-item ${
                      selectedRegions.neighborhood === neighborhood
                        ? "selected select-item"
                        : ""
                    }`}
                    onClick={() => handleNeighborhoodSelect(neighborhood)}
                  >
                    {neighborhood}
                  </li>
                )
              )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RegionSelector;