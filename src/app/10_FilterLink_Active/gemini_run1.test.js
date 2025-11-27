// filter-link-active.component.spec.ts
import { render, screen, fireEvent } from '@testing-library/angular';
import { FilterLinkActiveComponent } from './filter-link-active.component';

describe('FilterLinkActiveComponent', () => {
  /**
   * Renders the component with optional properties for each test.
   * @param {object} props - The component properties to override.
   * @returns {Promise<any>} The testing library render result.
   */
  const setup = async (props = {}) => {
    return render(FilterLinkActiveComponent, {
      componentProperties: props,
    });
  };

  test('should render the link with correct text and href', async () => {
    await setup();
    const linkElement = screen.getByTestId('filter-link-active');

    expect(linkElement).toBeInTheDocument();
    expect(linkElement.textContent?.trim()).toBe('Active');
    expect(linkElement).toHaveAttribute('href', '#/active');
  });

  test('should not have the "selected" class by default', async () => {
    await setup();
    const linkElement = screen.getByTestId('filter-link-active');

    expect(linkElement).not.toHaveClass('selected');
  });

  test('should not have the "selected" class when isSelected is false', async () => {
    await setup({ isSelected: false });
    const linkElement = screen.getByTestId('filter-link-active');

    expect(linkElement).not.toHaveClass('selected');
  });

  test('should have the "selected" class when isSelected is true', async () => {
    await setup({ isSelected: true });
    const linkElement = screen.getByTestId('filter-link-active');

    expect(linkElement).toHaveClass('selected');
  });

  test('should call selectFilter method and log to console upon click', async () => {
    const { fixture } = await setup();
    const componentInstance = fixture.componentInstance;

    // Spy on the component method and console.log
    const selectFilterSpy = jest.spyOn(componentInstance, 'selectFilter');
    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    const linkElement = screen.getByTestId('filter-link-active');
    fireEvent.click(linkElement);

    // Assert that the component method was called
    expect(selectFilterSpy).toHaveBeenCalledTimes(1);

    // Assert that console.log was called with the specific message
    expect(consoleLogSpy).toHaveBeenCalledWith('Active filter selected');

    // Clean up spies
    selectFilterSpy.mockRestore();
    consoleLogSpy.mockRestore();
  });
});