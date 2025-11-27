import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ToggleAllCheckboxComponent } from './toggle-all-checkbox.component';

describe('ToggleAllCheckboxComponent', () => {
  let component: ToggleAllCheckboxComponent;
  let fixture: ComponentFixture<ToggleAllCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToggleAllCheckboxComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ToggleAllCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render the checkbox with correct initial state', () => {
    component.isChecked = true;
    fixture.detectChanges();

    const checkboxElement = fixture.debugElement.query(By.css('[data-testid="toggle-all-checkbox"]')).nativeElement;
    expect(checkboxElement.checked).toBeTrue();
  });

  it('should reflect "isChecked" state dynamically when updated', () => {
    component.isChecked = false;
    fixture.detectChanges();

    let checkboxElement = fixture.debugElement.query(By.css('[data-testid="toggle-all-checkbox"]')).nativeElement;
    expect(checkboxElement.checked).toBeFalse();

    component.isChecked = true;
    fixture.detectChanges();

    checkboxElement = fixture.debugElement.query(By.css('[data-testid="toggle-all-checkbox"]')).nativeElement;
    expect(checkboxElement.checked).toBeTrue();
  });

  it('should toggle "isChecked" state on input change event', () => {
    const checkboxElement = fixture.debugElement.query(By.css('[data-testid="toggle-all-checkbox"]')).nativeElement;

    checkboxElement.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(component.isChecked).toBeTrue();

    checkboxElement.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(component.isChecked).toBeFalse();
  });

  it('should call "toggleAll" method on input change', () => {
    const toggleAllSpy = jest.spyOn(component, 'toggleAll');
    const checkboxElement = fixture.debugElement.query(By.css('[data-testid="toggle-all-checkbox"]')).nativeElement;

    checkboxElement.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(toggleAllSpy).toHaveBeenCalled();
    expect(component.isChecked).toBeTrue();
  });

  it('should log "Toggle all" with the new state when "toggleAll" is called', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    const checkboxElement = fixture.debugElement.query(By.css('[data-testid="toggle-all-checkbox"]')).nativeElement;

    checkboxElement.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(consoleSpy).toHaveBeenCalledWith('Toggle all:', true);

    checkboxElement.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(consoleSpy).toHaveBeenCalledWith('Toggle all:', false);

    consoleSpy.mockRestore();
  });

  it('should render the label with the correct text', () => {
    const labelElement = fixture.debugElement.query(By.css('.toggle-all-label')).nativeElement;
    expect(labelElement.textContent.trim()).toBe('Toggle All Input');
  });
});