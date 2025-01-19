import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import regions from "../regions.json";

const RegionSelector = ({ address, onClickCancel, onClickSave }) => {
  // 지역 선택 상태 초기화: 주소를 받아서 시, 군, 구, 동을 초기화
  const [selectedRegions, setSelectedRegions] = useState(() => {
    const [city = "", district = "", neighborhood = ""] =
      address?.split(" ") || [];
    return { city, district, neighborhood };
  });

  // 검색어 상태 관리
  const [searchTerm, setSearchTerm] = useState("");

  // 지역 데이터를 복사해서 사용
  const regionData = [...regions];

  // 시 선택 시 하위 지역 초기화
  const handleCitySelect = (city) => {
    setSelectedRegions({
      city: city,
      district: "",
      neighborhood: "",
    });
  };

  // 군/구 선택 시 하위 지역 초기화
  const handleDistrictSelect = (district) => {
    setSelectedRegions({
      ...selectedRegions,
      district: district,
      neighborhood: "",
    });
  };

  // 동 선택 시 상태 업데이트
  const handleNeighborhoodSelect = (neighborhood) => {
    setSelectedRegions({
      ...selectedRegions,
      neighborhood: neighborhood,
    });
  };

  // 선택된 시에 해당하는 군/구 데이터 가져오기
  const getDistricts = () => {
    const city = regionData.find((city) => city.name === selectedRegions.city);
    return city ? city.children : [];
  };

  // 선택된 군/구에 해당하는 동 데이터 가져오기
  const getNeighborhoods = () => {
    const districts = getDistricts();
    const district = districts.find(
      (district) => district.name === selectedRegions.district
    );
    return district ? district.children : [];
  };

  // 검색어로 지역 필터링
  const filterRegions = (regions, type) => {
    if (!searchTerm) return regions; // 검색어가 없으면 원본 데이터 반환

    switch (type) {
      case "city":
        return regions.filter((city) =>
          city.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      case "district":
        return regions.filter((district) =>
          district.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      case "neighborhood":
        return regions.filter((neighborhood) =>
          neighborhood.toLowerCase().includes(searchTerm.toLowerCase())
        );
      default:
        return regions;
    }
  };

  return (
    <div className="region-selector-container">
      <h2>거주 중인 지역을 선택해주세요.</h2>

      <div className="button-container">
        <button onClick={onClickCancel} className="nav-button">
          취소 ←
        </button>
        <button
          onClick={() => {
            onClickSave(
              `${selectedRegions.city} ${selectedRegions.district} ${selectedRegions.neighborhood}`
            );
          }}
          className="nav-button"
        >
          등록 ✓
        </button>
      </div>

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
