import { renderHook, waitFor } from "@testing-library/react";

import { useFetch } from "../../hooks/useFetch";

describe("useFetch Hook", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should fetch data successfully", async () => {
    const mockData = { name: "Test User" };

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData),
      }),
    );

    const { result } = renderHook(() => useFetch("/mockData.json"));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(global.fetch).toHaveBeenCalledWith(
      "/mockData.json",
      expect.objectContaining({ signal: expect.any(AbortSignal) }),
    );
    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBeNull();
  });

  it("should handle fetch error when response is not ok", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        status: 500,
      }),
    );

    const { result } = renderHook(() => useFetch("/mockData.json"));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toBeNull();
    expect(result.current.error).toBe("Request failed: 500");
  });

  it("should handle network error", async () => {
    global.fetch = jest.fn(() => Promise.reject(new Error("Network Error")));

    const { result } = renderHook(() => useFetch("/mockData.json"));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toBeNull();
    expect(result.current.error).toBe("Network Error");
  });

  it("should not fetch when url is empty", async () => {
    global.fetch = jest.fn();

    const { result } = renderHook(() => useFetch(""));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(global.fetch).not.toHaveBeenCalled();
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();
  });

  it("should abort fetch on unmount", async () => {
    const abortSpy = jest.fn();

    global.AbortController = jest.fn(() => ({
      signal: {},
      abort: abortSpy,
    }));

    global.fetch = jest.fn(() => new Promise(() => {}));

    const { unmount } = renderHook(() => useFetch("/mockData.json"));

    unmount();

    expect(abortSpy).toHaveBeenCalled();
  });
});
