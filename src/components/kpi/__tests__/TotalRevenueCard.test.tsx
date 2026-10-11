import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import TotalRevenueCard from "../TotalRevenueCard";
import { DASHBOARD_YEAR } from "../../../constants";

describe("TotalRevenueCard", () => {
  it("renders the revenue as a named region with a heading and amount", () => {
    render(<TotalRevenueCard />);

    const region = screen.getByRole("region", {
      name: `Total Revenue / ${DASHBOARD_YEAR}`,
    });
    expect(region).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: `Total Revenue / ${DASHBOARD_YEAR}`,
        level: 2,
      }),
    ).toBeInTheDocument();
    expect(region).toHaveTextContent("$1,522");
  });

  it("hides the decorative trend icon from assistive technology", () => {
    const { container } = render(<TotalRevenueCard />);

    const decorativeIcon = container.querySelector('[aria-hidden="true"]');
    expect(decorativeIcon).toBeInTheDocument();
    expect(decorativeIcon?.querySelector("svg")).toBeInTheDocument();
  });
});
