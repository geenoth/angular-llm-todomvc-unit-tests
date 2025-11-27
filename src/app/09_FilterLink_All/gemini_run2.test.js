import { render, screen, fireEvent } from '@testing-library/angular';
import { FilterLinkAllComponent } from './filter-link-all.component';

describe('FilterLinkAllComponent', () => {
  const setup = async (props: Partial<FilterLinkAllComponent> = {}) => {
    const { fixture } = await render(FilterLinkAllComponent, {
      componentProperties: props,
    });
    return { fixture };
  };

  test('should create the component and render the link', async () => {
    await setup();
    const linkElement = screen.getByTestId('filter-link-all');
    expect(linkElement).toBeInTheDocument();
    expect(linkElement.textContent).toContain('All');
    expect(linkElement).toHaveAttribute('href', '#/');
  });

  test('should not have the "selected" class when isSelected is false by default', async () => {
    await setup();
    const linkElement = screen.getByTestId('filter-link-all');
    expect(linkElement).not.toHaveClass('selected');
  });

  test('should not have the "selected" class when isSelected is explicitly false', async () => {
    await setup({ isSelected: false });
    const linkElement = screen.getByTestId('filter-link-all');
    expect(linkElement).not.toHaveClass('selected');
  });

  test('should have the "selected" class when isSelected is true', async () => {
    await setup({ isSelected: true });
    const linkElement = screen.getByTestId('filter-link-all');
    expect(linkElement).toHaveClass('selected');
  });

  test('should call selectFilter method on click', async () => {
    const { fixture } = await setup();
    const componentInstance = fixture.componentInstance;
    const selectFilterSpy = jest.spyOn(componentInstance, 'selectFilter');

    const linkElement = screen.getByTestId('filter-link-all');
    fireEvent.click(linkElement);

    expect(selectFilterSpy).toHaveBeenCalledTimes(1);
  });

  test('should log "All filter selected" to the console when clicked', async () => {
    await setup();
    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    const linkElement = screen.getByTestId('filter-link-all');
    fireEvent.click(linkElement);

    expect(consoleLogSpy).toHaveBeenCalledWith('All filter selected');

    // Clean up the spy
    consoleLogSpy.mockRestore();
  });

  test('should update the "selected" class when isSelected property changes', async () => {
    const { fixture } = await setup({ isSelected: false });
    const linkElement = screen.getByTestId('filter-link-all');
    expect(linkElement).not.toHaveClass('selected');

    // Change the property
    fixture.componentInstance.isSelected = true;
    fixture.detectChanges(); // Manually trigger change detection

    expect(linkElement).toHaveClass('selected');

    // Change it back
    fixture.componentInstance.isSelected = false;
    fixture.detectChanges();

    expect(linkElement).not.toHaveClass('selected');
  });
});