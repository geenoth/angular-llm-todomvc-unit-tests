import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToggleAllCheckboxComponent } from './toggle-all-checkbox.component';
import { By } from '@angular/platform-browser';

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
    component.isChecked = false;
    fixture.detectChanges();

    const checkbox = fixture.debugElement.query(By.css('[data-testid="toggle-all-checkbox"]'));
    expect(checkbox).toBeTruthy();
    expect(checkbox.nativeElement.checked).toBe(false);
  });

  it('should reflect the isChecked @Input() value', () => {
    component.isChecked = true;
    fixture.detectChanges();

    const checkbox = fixture.debugElement.query(By.css('[data-testid="toggle-all-checkbox"]'));
    expect(checkbox.nativeElement.checked).toBe(true);
  });

  it('should toggle the isChecked value when the checkbox is clicked', () => {
    component.isChecked = false;
    fixture.detectChanges();

    const checkbox = fixture.debugElement.query(By.css('[data-testid="toggle-all-checkbox"]'));
    checkbox.nativeElement.click();

    expect(component.isChecked).toBe(true);
  });

  it('should call toggleAll method when the checkbox state changes', () => {
    jest.spyOn(component, 'toggleAll');
    const checkbox = fixture.debugElement.query(By.css('[data-testid="toggle-all-checkbox"]'));
    checkbox.nativeElement.dispatchEvent(new Event('change'));

    expect(component.toggleAll).toHaveBeenCalled();
    expect(component.isChecked).toBe(true);
  });

  it('should log "Toggle all:" with the correct isChecked value when toggleAll is called', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    component.isChecked = false;
    component.toggleAll();

    expect(consoleSpy).toHaveBeenCalledWith('Toggle all:', true);
    expect(component.isChecked).toBe(true);

    component.toggleAll();
    expect(consoleSpy).toHaveBeenCalledWith('Toggle all:', false);
    expect(component.isChecked).toBe(false);

    consoleSpy.mockRestore();
  });
});