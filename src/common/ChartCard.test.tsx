import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ChartCard } from "./ChartCard";

describe("ChartCard", () => {
  it("exposes its visible title as a named region and heading", () => {
    render(
      <ChartCard title="Monthly Revenue 2023">
        <p>Chart content</p>
      </ChartCard>,
    );

    expect(
      screen.getByRole("region", { name: "Monthly Revenue 2023" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Monthly Revenue 2023", level: 2 }),
    ).toBeInTheDocument();
    expect(screen.getByText("Chart content")).toBeInTheDocument();
  });
});
