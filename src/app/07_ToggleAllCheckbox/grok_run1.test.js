import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToggleAllCheckboxComponent } from './toggle-all-checkbox.component';

describe('ToggleAllCheckboxComponent', () => {
  let component: ToggleAllCheckboxComponent;
  let fixture: ComponentFixture<ToggleAllCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToggleAllCheckboxComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ToggleAllCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the checkbox with correct initial checked state', () => {
    const checkbox = fixture.nativeElement.querySelector('[data-testid="toggle-all-checkbox"]');
    expect(checkbox).toBeTruthy();
    expect(checkbox.checked).toBe(false);
  });

  it('should render the label with correct text', () => {
    const label = fixture.nativeElement.querySelector('.toggle-all-label');
    expect(label.textContent.trim()).toBe('Toggle All Input');
  });

  it('should update isChecked property when checkbox is toggled', () => {
    const checkbox = fixture.nativeElement.querySelector('[data-testid="toggle-all-checkbox"]');
    checkbox.click();
    fixture.detectChanges();
    expect(component.isChecked).toBe(true);
    expect(checkbox.checked).toBe(true);
  });

  it('should reflect input property change in UI', () => {
    component.isChecked = true;
    fixture.detectChanges();
    const checkbox = fixture.nativeElement.querySelector('[data-testid="toggle-all-checkbox"]');
    expect(checkbox.checked).toBe(true);
  });

  it('should call toggleAll method on checkbox change event', () => {
    jest.spyOn(component, 'toggleAll');
    const checkbox = fixture.nativeElement.querySelector('[data-testid="toggle-all-checkbox"]');
    checkbox.dispatchEvent(new Event('change'));
    expect(component.toggleAll).toHaveBeenCalled();
  });

  it('should toggle isChecked state when toggleAll is called', () => {
    component.isChecked = false;
    component.toggleAll();
    expect(component.isChecked).toBe(true);
    component.toggleAll();
    expect(component.isChecked).toBe(false);
  });
});