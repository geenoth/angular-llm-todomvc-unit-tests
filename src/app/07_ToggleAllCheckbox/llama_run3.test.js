// toggle-all-checkbox.component.spec.ts
import { render, fireEvent, waitFor } from '@angular/core/testing';
import { ToggleAllCheckboxComponent } from './toggle-all-checkbox.component';
import { TestBed } from '@angular/core/testing';

describe('ToggleAllCheckboxComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ToggleAllCheckboxComponent],
    }).compileComponents();
  });

  it('renders correctly', async () => {
    const { getByTestId } = await render(ToggleAllCheckboxComponent);
    const checkbox = getByTestId('toggle-all-checkbox');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox.checked).toBe(false);
  });

  it('toggles checkbox on click', async () => {
    const { getByTestId } = await render(ToggleAllCheckboxComponent);
    const checkbox = getByTestId('toggle-all-checkbox');
    fireEvent.click(checkbox);
    await waitFor(() => expect(checkbox.checked).toBe(true));
  });

  it('emits change event on toggle', async () => {
    const { getByTestId } = await render(ToggleAllCheckboxComponent);
    const checkbox = getByTestId('toggle-all-checkbox');
    fireEvent.change(checkbox);
    await waitFor(() => expect(checkbox.checked).toBe(true));
  });

  it('updates checkbox state on input change', async () => {
    const { getByTestId, component } = await render(ToggleAllCheckboxComponent);
    const checkbox = getByTestId('toggle-all-checkbox');
    component.isChecked = true;
    await waitFor(() => expect(checkbox.checked).toBe(true));
  });

  it('logs to console on toggle', async () => {
    const consoleLogSpy = jest.spyOn(console, 'log');
    const { getByTestId } = await render(ToggleAllCheckboxComponent);
    const checkbox = getByTestId('toggle-all-checkbox');
    fireEvent.click(checkbox);
    await waitFor(() => expect(consoleLogSpy).toHaveBeenCalledTimes(1));
    expect(consoleLogSpy).toHaveBeenCalledWith('Toggle all:', true);
  });
});