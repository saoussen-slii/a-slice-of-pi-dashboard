import { act, fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import DateFilters from "./DateFilters";
import i18n from "../../i18n";

describe("DateFilters", () => {
  it("renders date fields with associated labels and values", () => {
    render(
      <DateFilters
        startDate="2023-01-01"
        endDate="2023-12-31"
        onStartDateChange={vi.fn()}
        onEndDateChange={vi.fn()}
      />,
    );

    expect(screen.getByRole("group", { name: "Filter orders by date" })).toBeInTheDocument();
    expect(screen.getByLabelText("Start date")).toHaveValue("2023-01-01");
    expect(screen.getByLabelText("End date")).toHaveValue("2023-12-31");
  });

  it("calls the matching callback when a date changes", () => {
    const onStartDateChange = vi.fn();
    const onEndDateChange = vi.fn();
    render(
      <DateFilters
        startDate=""
        endDate=""
        onStartDateChange={onStartDateChange}
        onEndDateChange={onEndDateChange}
      />,
    );

    fireEvent.change(screen.getByLabelText("Start date"), {
      target: { value: "2023-02-01" },
    });
    fireEvent.change(screen.getByLabelText("End date"), {
      target: { value: "2023-03-01" },
    });

    expect(onStartDateChange).toHaveBeenCalledOnce();
    expect(onEndDateChange).toHaveBeenCalledOnce();
  });

  it("updates labels when the active language changes", async () => {
    render(
      <DateFilters
        startDate=""
        endDate=""
        onStartDateChange={vi.fn()}
        onEndDateChange={vi.fn()}
      />,
    );

    await act(async () => {
      await i18n.changeLanguage("fr");
    });

    expect(screen.getByLabelText("Date de début")).toBeInTheDocument();
    expect(screen.getByLabelText("Date de fin")).toBeInTheDocument();
  });
});
