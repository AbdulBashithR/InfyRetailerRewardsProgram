import {
  calculateRewardPoints,
  computeRewardsPointsForTransactions,
  getMonthlyRewards,
  getTotalRewards,
  sortByDate,
} from "../../utils/rewardUtils";

describe("calculateRewardPoints", () => {
  test("returns 0 for price less than or equal to 50", () => {
    expect(calculateRewardPoints(0)).toBe(0);
    expect(calculateRewardPoints(25)).toBe(0);
    expect(calculateRewardPoints(50)).toBe(0);
  });

  test("returns correct points for price between 51 and 100", () => {
    expect(calculateRewardPoints(60)).toBe(10);
    expect(calculateRewardPoints(75)).toBe(25);
    expect(calculateRewardPoints(100)).toBe(50);
  });

  test("returns correct points for price greater than 100", () => {
    expect(calculateRewardPoints(120)).toBe(90); // (20 * 2) + 50
    expect(calculateRewardPoints(150)).toBe(150); // (50 * 2) + 50
  });

  test("handles decimal prices using Math.floor", () => {
    expect(calculateRewardPoints(100.75)).toBe(50);
    expect(calculateRewardPoints(120.99)).toBe(90);
  });
  test("handles negative prices", () => {
    expect(calculateRewardPoints(-100.75)).toBe(0);
    expect(calculateRewardPoints(-120.99)).toBe(0);
  });
  test("handles non-numeric input by returning 0", () => {
    expect(calculateRewardPoints("abc")).toBe(0);
    expect(calculateRewardPoints(null)).toBe(0);
    expect(calculateRewardPoints(undefined)).toBe(0);
  });
});

describe("computeRewardsPointsForTransactions", () => {
  const mockTransactions = [
    {
      transactionId: 1,
      customerId: "C1",
      customerName: "John",
      price: 120,
      purchaseDate: "2024-01-10",
    },
    {
      transactionId: 2,
      customerId: "C2",
      customerName: "Jane",
      price: 70,
      purchaseDate: "2024-01-15",
    },
    {
      transactionId: 3,
      customerId: "C3",
      customerName: "Bob",
      purchaseDate: "2024-01-20",
    },
  ];

  test("adds rewardPoints to each transaction", () => {
    const result = computeRewardsPointsForTransactions(mockTransactions);

    expect(result).toHaveLength(3);
    expect(result[0].rewardPoints).toBe(90);
    expect(result[1].rewardPoints).toBe(20);
  });

  test("handles missing price using optional chaining and default 0", () => {
    const result = computeRewardsPointsForTransactions(mockTransactions);
    expect(result[2].rewardPoints).toBe(0);
  });
  test("handles empty array", () => {
    const result = computeRewardsPointsForTransactions([]);
    expect(result).toEqual([]);
  });
});

describe("getMonthlyRewards", () => {
  const enrichedTransactions = [
    {
      customerId: "C1",
      customerName: "John",
      purchaseDate: "2024-01-10",
      rewardPoints: 90,
    },
    {
      customerId: "C1",
      customerName: "John",
      purchaseDate: "2024-01-20",
      rewardPoints: 10,
    },
    {
      customerId: "C2",
      customerName: "Jane",
      purchaseDate: "2024-02-05",
      rewardPoints: 50,
    },
    {
      customerId: "C1",
      customerName: "John",
      purchaseDate: "2024-02-10",
      rewardPoints: 40,
    },
  ];

  test("aggregates monthly rewards per customer", () => {
    const result = getMonthlyRewards(enrichedTransactions);

    const janJohn = result.find(
      (r) => r.customerId === "C1" && r.monthNumber === 1,
    );
    const febJohn = result.find(
      (r) => r.customerId === "C1" && r.monthNumber === 2,
    );

    expect(janJohn.monthlyRewardPoints).toBe(100);
    expect(febJohn.monthlyRewardPoints).toBe(40);
  });

  test("sorts results by year then month ascending", () => {
    const unsorted = [
      {
        customerId: "C1",
        customerName: "John",
        purchaseDate: "2024-03-01",
        rewardPoints: 30,
      },
      {
        customerId: "C1",
        customerName: "John",
        purchaseDate: "2024-01-01",
        rewardPoints: 10,
      },
      {
        customerId: "C1",
        customerName: "John",
        purchaseDate: "2024-02-01",
        rewardPoints: 20,
      },
    ];

    const result = getMonthlyRewards(unsorted);

    expect(result[0].monthNumber).toBe(1);
    expect(result[1].monthNumber).toBe(2);
    expect(result[2].monthNumber).toBe(3);
  });

  test("returns empty array for empty input", () => {
    expect(getMonthlyRewards([])).toEqual([]);
  });
});

describe("getTotalRewards", () => {
  const enrichedTransactions = [
    { customerId: "C1", customerName: "John", rewardPoints: 50 },
    { customerId: "C1", customerName: "John", rewardPoints: 70 },
    { customerId: "C2", customerName: "Jane", rewardPoints: 30 },
  ];

  test("aggregates total rewards per customer", () => {
    const result = getTotalRewards(enrichedTransactions);

    const john = result.find((r) => r.customerName === "John");
    const jane = result.find((r) => r.customerName === "Jane");

    expect(john.totalRewardPoints).toBe(120);
    expect(jane.totalRewardPoints).toBe(30);
  });

  test("returns empty array for empty transactions", () => {
    expect(getTotalRewards([])).toEqual([]);
  });
});

describe("sortByDate", () => {
  const transactions = [
    { purchaseDate: "2024-03-10", id: 1 },
    { purchaseDate: "2024-01-05", id: 2 },
    { purchaseDate: "2024-02-15", id: 3 },
  ];

  test("sorts transactions by purchaseDate ascending", () => {
    const result = sortByDate(transactions);

    expect(result[0].purchaseDate).toBe("2024-01-05");
    expect(result[1].purchaseDate).toBe("2024-02-15");
    expect(result[2].purchaseDate).toBe("2024-03-10");
  });

  test("does not mutate original array", () => {
    const original = [...transactions];
    sortByDate(transactions);
    expect(transactions).toEqual(original);
  });

  test("handles empty array", () => {
    expect(sortByDate([])).toEqual([]);
  });
});
