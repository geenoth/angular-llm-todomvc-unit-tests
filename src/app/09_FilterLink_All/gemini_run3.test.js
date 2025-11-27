import { render, screen, fireEvent } from '@testing-library/angular';
import { FilterLinkAllComponent } from './filter-link-all.component';

describe('FilterLinkAllComponent', () => {
  // Test 1: Component should render correctly
  test('should create and render the "All" link', async () => {
    await render(FilterLinkAllComponent);
    const linkElement = screen.getByTestId('filter-link-all');
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveTextContent('All');
    expect(linkElement).toHaveAttribute('href', '#/');
  });

  // Test 2: Test the 'isSelected' prop when it is false (default)
  test('should not have the "selected" class when isSelected is not provided or is false', async () => {
    await render(FilterLinkAllComponent, {
      componentProperties: { isSelected: false },
    });
    const linkElement = screen.getByTestId('filter-link-all');
    expect(linkElement).not.toHaveClass('selected');
  });

  // Test 3: Test the 'isSelected' prop when it is true
  test('should have the "selected" class when isSelected is true', async () => {
    await render(FilterLinkAllComponent, {
      componentProperties: { isSelected: true },
    });
    const linkElement = screen.getByTestId('filter-link-all');
    expect(linkElement).toHaveClass('selected');
  });

  // Test 4: Test user click interaction
  test('should call selectFilter method when the link is clicked', async () => {
    const { fixture } = await render(FilterLinkAllComponent);
    const componentInstance = fixture.componentInstance;
    
    // Spy on the component's method
    const selectFilterSpy = jest.spyOn(componentInstance, 'selectFilter');
    
    const linkElement = screen.getByTestId('filter-link-all');
    await fireEvent.click(linkElement);
    
    expect(selectFilterSpy).toHaveBeenCalledTimes(1);
    
    // Optional: Also test the console.log inside the method if that's a desired side-effect
    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
    await fireEvent.click(linkElement);
    expect(consoleLogSpy).toHaveBeenCalledWith('All filter selected');
    
    // Clean up spies
    selectFilterSpy.mockRestore();
    consoleLogSpy.mockRestore();
  });

  // Test 5: Test that props can be updated
  test('should dynamically add and remove the "selected" class on property change', async () => {
    const { rerender } = await render(FilterLinkAllComponent, {
        componentProperties: { isSelected: false }
    });
    const linkElement = screen.getByTestId('filter-link-all');
    
    // Initially should not have the class
    expect(linkElement).not.toHaveClass('selected');

    // Re-render the component with the updated prop
    await rerender({ isSelected: true });

    // Should now have the class
    expect(linkElement).toHaveClass('selected');

    // Re-render again with the prop set to false
    await rerender({ isSelected: false });

    // Should not have the class again
    expect(linkElement).not.toHaveClass('selected');
  });
});