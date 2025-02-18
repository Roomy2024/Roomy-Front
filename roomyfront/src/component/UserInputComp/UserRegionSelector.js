import React, { useEffect, useState } from "react";
import regions from "../../regions.json";
import "../../css/Region.css";  // <-- 여기서 CSS import

const UserRegionSelector = ({
  area,
  setArea,
  setNextPossible
}) => {
  const [selectedRegions, setSelectedRegions] = useState(() => {
    const [city = "", district = "", neighborhood = ""] = area?.split(" ") || [];
    return { city, district, neighborhood };
  });

  const [searchTerm, setSearchTerm] = useState("");
  const regionData = [...regions];

  // 시 선택
  const handleCitySelect = (cityName) => {
    setSelectedRegions({
      city: cityName,
      district: "",
      neighborhood: ""
    });
  };

  // 군/구 선택
  const handleDistrictSelect = (districtName) => {
    setSelectedRegions((prev) => ({
      ...prev,
      district: districtName,
      neighborhood: ""
    }));
  };

  // 동 선택
  const handleNeighborhoodSelect = (neighborhoodName) => {
    setSelectedRegions((prev) => ({
      ...prev,
      neighborhood: neighborhoodName
    }));
  };

  // 군/구 목록
  const getDistricts = () => {
    const cityObj = regionData.find((c) => c.name === selectedRegions.city);
    return cityObj ? cityObj.children : [];
  };

  // 동 목록
  const getNeighborhoods = () => {
    const districts = getDistricts();
    const districtObj = districts.find((d) => d.name === selectedRegions.district);
    return districtObj ? districtObj.children : [];
  };

  // 검색어 필터
  const filterRegions = (list, type) => {
    if (!searchTerm) return list;
    const lowerSearch = searchTerm.toLowerCase();
    switch (type) {
      case "city":
        return list.filter((c) => c.name.toLowerCase().includes(lowerSearch));
      case "district":
        return list.filter((d) => d.name.toLowerCase().includes(lowerSearch));
      case "neighborhood":
        return list.filter((n) => n.toLowerCase().includes(lowerSearch));
      default:
        return list;
    }
  };

  // 상태 갱신
  useEffect(() => {
    const { city, district, neighborhood } = selectedRegions;
    const finalArea = `${city} ${district} ${neighborhood}`.trim();
    setArea(finalArea);

    if (!city || !district || !neighborhood) {
      setNextPossible(false);
    } else {
      setNextPossible(true);
    }
  }, [selectedRegions, setArea, setNextPossible]);

  return (
    <div className="region-container">
      <h2>거주 중인 지역을 선택해주세요.</h2>

      {/* 검색창 */}
      <div className="region-search-wrapper">
        <input
          type="text"
          className="region-search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="지역명을 검색하세요"
        />
        <button className="region-search-button">검색</button>
      </div>

      <div className="region-columns">
        {/* 시 / 도 목록 */}
        <div className="region-column">
          <h3>시 · 도</h3>
          <ul className="region-list">
            {filterRegions(regionData, "city").map((c) => (
              <li
                key={c.name}
                className={`region-item ${
                  selectedRegions.city === c.name ? "select-item" : ""
                }`}
                onClick={() => handleCitySelect(c.name)}
              >
                {c.name}
              </li>
            ))}
          </ul>
        </div>

        {/* 시 / 군 / 구 목록 */}
        <div className="region-column">
          <h3>시 · 군 · 구</h3>
          <ul className="region-list">
            {selectedRegions.city &&
              filterRegions(getDistricts(), "district").map((d) => (
                <li
                  key={d.name}
                  className={`region-item ${
                    selectedRegions.district === d.name ? "select-item" : ""
                  }`}
                  onClick={() => handleDistrictSelect(d.name)}
                >
                  {d.name}
                </li>
              ))}
          </ul>
        </div>

        {/* 동 / 읍 / 면 목록 */}
        <div className="region-column">
          <h3>동 · 읍 · 면</h3>
          <ul className="region-list">
            {selectedRegions.district &&
              filterRegions(getNeighborhoods(), "neighborhood").map((n) => (
                <li
                  key={n}
                  className={`region-item ${
                    selectedRegions.neighborhood === n ? "select-item" : ""
                  }`}
                  onClick={() => handleNeighborhoodSelect(n)}
                >
                  {n}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserRegionSelector;
