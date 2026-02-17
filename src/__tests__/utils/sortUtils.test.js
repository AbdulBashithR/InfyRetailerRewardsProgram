import { sortData } from "../../utils/sortUtils";

describe("sortData utility", () => {
  const mockData = [
    { name: "Charlie", amount: 120, points: 90 },
    { name: "Alice", amount: 75, points: 25 },
    { name: "Bob", amount: 45, points: 0 },
  ];

  test("should return original data when orderBy is null", () => {
    const result = sortData(mockData, null, "asc");
    expect(result).toEqual(mockData);
  });

  test("should sort data in ascending order (number)", () => {
    const result = sortData(mockData, "amount", "asc");
    expect(result.map((item) => item.amount)).toEqual([45, 75, 120]);
  });

  test("should sort data in descending order (number)", () => {
    const result = sortData(mockData, "amount", "desc");
    expect(result.map((item) => item.amount)).toEqual([120, 75, 45]);
  });

  test("should sort data in ascending order (string)", () => {
    const result = sortData(mockData, "name", "asc");
    expect(result.map((item) => item.name)).toEqual([
      "Alice",
      "Bob",
      "Charlie",
    ]);
  });

  test("should sort data in descending order (string)", () => {
    const result = sortData(mockData, "name", "desc");
    expect(result.map((item) => item.name)).toEqual([
      "Charlie",
      "Bob",
      "Alice",
    ]);
  });

  test("should not mutate the original array", () => {
    const originalCopy = [...mockData];
    sortData(mockData, "amount", "asc");
    expect(mockData).toEqual(originalCopy);
  });

  test("should handle empty array", () => {
    const result = sortData([], "amount", "asc");
    expect(result).toEqual([]);
  });

  test("should handle undefined values safely", () => {
    const dataWithUndefined = [
      { name: "A", amount: 100 },
      { name: "B" },
      { name: "C", amount: 50 },
    ];

    const result = sortData(dataWithUndefined, "amount", "asc");
    expect(result.length).toBe(3);
  });

  test("should return stable result when values are equal", () => {
    const equalData = [
      { name: "A", amount: 50 },
      { name: "B", amount: 50 },
    ];

    const result = sortData(equalData, "amount", "asc");
    expect(result).toEqual(equalData);
  });
});
