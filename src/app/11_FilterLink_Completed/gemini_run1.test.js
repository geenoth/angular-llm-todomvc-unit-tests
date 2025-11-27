import { render, screen, fireEvent } from '@testing-library/angular';
import { FilterLinkCompletedComponent } from './filter-link-completed.component';
import '@testing-library/jest-dom';

describe('FilterLinkCompletedComponent', () => {
  const getLink = () => screen.getByTestId('filter-link-completed');

  test('should create', async () => {
    await render(FilterLinkCompletedComponent);
    expect(getLink()).toBeInTheDocument();
  });

  test('should render the link with correct text and href', async () => {
    await render(FilterLinkCompletedComponent);
    const linkElement = getLink();

    expect(linkElement).toHaveTextContent('Completed');
    expect(linkElement).toHaveAttribute('href', '#/completed');
  });

  test('should not have the "selected" class by default', async () => {
    await render(FilterLinkCompletedComponent);
    expect(getLink()).not.toHaveClass('selected');
  });

  test('should not have the "selected" class when isSelected is false', async () => {
    await render(FilterLinkCompletedComponent, {
      componentProperties: { isSelected: false },
    });
    expect(getLink()).not.toHaveClass('selected');
  });

  test('should have the "selected" class when isSelected is true', async () => {
    await render(FilterLinkCompletedComponent, {
      componentProperties: { isSelected: true },
    });
    expect(getLink()).toHaveClass('selected');
  });

  test('should update the "selected" class when isSelected property changes', async () => {
    const { rerender } = await render(FilterLinkCompletedComponent, {
      componentProperties: { isSelected: false },
    });
    expect(getLink()).not.toHaveClass('selected');

    // Rerender the component with the updated property
    await rerender({ componentProperties: { isSelected: true } });
    expect(getLink()).toHaveClass('selected');

    // Rerender again to test toggling back
    await rerender({ componentProperties: { isSelected: false } });
    expect(getLink()).not.toHaveClass('selected');
  });

  test('should call selectFilter method on click', async () => {
    // Spy on the component's method
    const selectFilterSpy = jest.spyOn(
      FilterLinkCompletedComponent.prototype,
      'selectFilter'
    );

    await render(FilterLinkCompletedComponent);
    const linkElement = getLink();

    fireEvent.click(linkElement);

    expect(selectFilterSpy).toHaveBeenCalledTimes(1);

    // Clean up the spy
    selectFilterSpy.mockRestore();
  });

  test('should log to console when selectFilter is called', async () => {
    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();

    await render(FilterLinkCompletedComponent);
    fireEvent.click(getLink());

    expect(consoleLogSpy).toHaveBeenCalledWith('Completed filter selected');

    consoleLogSpy.mockRestore();
  });
});