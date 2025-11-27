import { render, screen, fireEvent } from '@testing-library/angular';
import { FilterLinkCompletedComponent } from './filter-link-completed.component';

describe('FilterLinkCompletedComponent', () => {
  // Test 1: Should render the link correctly with default props
  test('should create and render the "Completed" filter link', async () => {
    await render(FilterLinkCompletedComponent);
    const linkElement = screen.getByTestId('filter-link-completed');

    expect(linkElement).toBeInTheDocument();
    expect(linkElement.textContent).toContain('Completed');
    expect(linkElement).toHaveAttribute('href', '#/completed');
  });

  // Test 2: Should not have the 'selected' class when isSelected is false (default)
  test('should not have the "selected" class by default', async () => {
    await render(FilterLinkCompletedComponent);
    const linkElement = screen.getByTestId('filter-link-completed');

    expect(linkElement).not.toHaveClass('selected');
  });

  // Test 3: Should not have the 'selected' class when isSelected is explicitly false
  test('should not have the "selected" class when isSelected input is false', async () => {
    await render(FilterLinkCompletedComponent, {
      componentProperties: { isSelected: false },
    });
    const linkElement = screen.getByTestId('filter-link-completed');

    expect(linkElement).not.toHaveClass('selected');
  });

  // Test 4: Should have the 'selected' class when isSelected is true
  test('should have the "selected" class when isSelected input is true', async () => {
    await render(FilterLinkCompletedComponent, {
      componentProperties: { isSelected: true },
    });
    const linkElement = screen.getByTestId('filter-link-completed');

    expect(linkElement).toHaveClass('selected');
  });

  // Test 5: Should call the selectFilter method on click
  test('should call selectFilter() method on click', async () => {
    const { fixture } = await render(FilterLinkCompletedComponent);
    const componentInstance = fixture.componentInstance;
    const selectFilterSpy = jest.spyOn(componentInstance, 'selectFilter');

    const linkElement = screen.getByTestId('filter-link-completed');
    fireEvent.click(linkElement);

    expect(selectFilterSpy).toHaveBeenCalled();
    expect(selectFilterSpy).toHaveBeenCalledTimes(1);
  });

  // Test 6: Should log to the console when selectFilter is called
  test('should log to console when link is clicked', async () => {
    await render(FilterLinkCompletedComponent);
    const consoleLogSpy = jest.spyOn(console, 'log');

    const linkElement = screen.getByTestId('filter-link-completed');
    fireEvent.click(linkElement);

    expect(consoleLogSpy).toHaveBeenCalledWith('Completed filter selected');
    expect(consoleLogSpy).toHaveBeenCalledTimes(1);

    // Clean up the spy
    consoleLogSpy.mockRestore();
  });
});