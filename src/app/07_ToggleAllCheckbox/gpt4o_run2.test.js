import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToggleAllCheckboxComponent } from './toggle-all-checkbox.component';
import { By } from '@angular/platform-browser';

describe('ToggleAllCheckboxComponent', () => {
  let component: ToggleAllCheckboxComponent;
  let fixture: ComponentFixture<ToggleAllCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ToggleAllCheckboxComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ToggleAllCheckboxComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the toggle all checkbox with the correct initial state', () => {
    component.isChecked = true;
    fixture.detectChanges();

    const checkboxElement = fixture.debugElement.query(By.css('.toggle-all')).nativeElement;
    expect(checkboxElement.checked).toBe(true);

    component.isChecked = false;
    fixture.detectChanges();

    expect(checkboxElement.checked).toBe(false);
  });

  it('should toggle isChecked on change event', () => {
    component.isChecked = false;
    fixture.detectChanges();

    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();

    const checkboxElement = fixture.debugElement.query(By.css('.toggle-all')).nativeElement;
    checkboxElement.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(component.isChecked).toBe(true);
    expect(consoleLogSpy).toHaveBeenCalledWith('Toggle all:', true);

    checkboxElement.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(component.isChecked).toBe(false);
    expect(consoleLogSpy).toHaveBeenCalledWith('Toggle all:', false);

    consoleLogSpy.mockRestore();
  });

  it('should have the checked property bound to the isChecked input', () => {
    component.isChecked = false;
    fixture.detectChanges();

    let checkboxElement = fixture.debugElement.query(By.css('.toggle-all')).nativeElement;
    expect(checkboxElement.checked).toBe(false);

    component.isChecked = true;
    fixture.detectChanges();

    checkboxElement = fixture.debugElement.query(By.css('.toggle-all')).nativeElement;
    expect(checkboxElement.checked).toBe(true);
  });

  it('should render label with correct text', () => {
    fixture.detectChanges();

    const labelElement = fixture.debugElement.query(By.css('.toggle-all-label')).nativeElement;
    expect(labelElement.textContent).toContain('Toggle All Input');
  });
});