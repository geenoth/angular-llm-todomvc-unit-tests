import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ToggleAllCheckboxComponent } from './toggle-all-checkbox.component';

describe('ToggleAllCheckboxComponent', () => {
  let component: ToggleAllCheckboxComponent;
  let fixture: ComponentFixture<ToggleAllCheckboxComponent>;
  let checkboxElement: HTMLInputElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToggleAllCheckboxComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ToggleAllCheckboxComponent);
    component = fixture.componentInstance;
    checkboxElement = fixture.debugElement.query(
      By.css('[data-testid="toggle-all-checkbox"]')
    ).nativeElement;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the checkbox and label correctly', () => {
    expect(checkboxElement).not.toBeNull();
    const labelElement = fixture.debugElement.query(
      By.css('.toggle-all-label')
    ).nativeElement;
    expect(labelElement).not.toBeNull();
    expect(labelElement.textContent).toContain('Toggle All Input');
  });

  it('should initialize with isChecked as false by default', () => {
    expect(component.isChecked).toBe(false);
    expect(checkboxElement.checked).toBe(false);
  });

  it('should accept and reflect the isChecked input property when set to true', () => {
    component.isChecked = true;
    fixture.detectChanges();
    expect(checkboxElement.checked).toBe(true);
  });

  it('should accept and reflect the isChecked input property when set to false', () => {
    component.isChecked = false;
    fixture.detectChanges();
    expect(checkboxElement.checked).toBe(false);
  });

  it('should call toggleAll method on checkbox change event', () => {
    jest.spyOn(component, 'toggleAll');
    checkboxElement.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(component.toggleAll).toHaveBeenCalled();
  });

  it('should toggle isChecked from false to true when toggleAll is called', () => {
    expect(component.isChecked).toBe(false);
    component.toggleAll();
    fixture.detectChanges();
    expect(component.isChecked).toBe(true);
    expect(checkboxElement.checked).toBe(true);
  });

  it('should toggle isChecked from true to false when toggleAll is called', () => {
    component.isChecked = true;
    fixture.detectChanges();
    expect(component.isChecked).toBe(true);

    component.toggleAll();
    fixture.detectChanges();

    expect(component.isChecked).toBe(false);
    expect(checkboxElement.checked).toBe(false);
  });

  it('should toggle checkbox state on click', () => {
    // Initial state is false
    expect(checkboxElement.checked).toBe(false);

    // First click
    checkboxElement.click();
    fixture.detectChanges();
    expect(component.isChecked).toBe(true);
    expect(checkboxElement.checked).toBe(true);

    // Second click
    checkboxElement.click();
    fixture.detectChanges();
    expect(component.isChecked).toBe(false);
    expect(checkboxElement.checked).toBe(false);
  });

  it('should log the new state to the console when toggled', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    component.isChecked = false;
    fixture.detectChanges();

    component.toggleAll();
    fixture.detectChanges();

    expect(consoleSpy).toHaveBeenCalledWith('Toggle all:', true);

    component.toggleAll();
    fixture.detectChanges();

    expect(consoleSpy).toHaveBeenCalledWith('Toggle all:', false);
    consoleSpy.mockRestore();
  });
});