import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ChartCard } from "../ChartCard";
import { DASHBOARD_YEAR } from "../../constants";

describe("ChartCard", () => {
  it("exposes its visible title as a named region and heading", () => {
    render(
      <ChartCard title={`Monthly Revenue ${DASHBOARD_YEAR}`}>
        <p>Chart content</p>
      </ChartCard>,
    );

    expect(
      screen.getByRole("region", { name: `Monthly Revenue ${DASHBOARD_YEAR}` }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: `Monthly Revenue ${DASHBOARD_YEAR}`,
        level: 2,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText("Chart content")).toBeInTheDocument();
  });
});
