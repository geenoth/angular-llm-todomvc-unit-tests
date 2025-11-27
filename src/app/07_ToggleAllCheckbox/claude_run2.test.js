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

  describe('Rendering', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should render the toggle-all-container div', () => {
      const container = fixture.debugElement.query(By.css('.toggle-all-container'));
      expect(container).toBeTruthy();
    });

    it('should render a checkbox input with correct class', () => {
      const checkbox = fixture.debugElement.query(By.css('input.toggle-all'));
      expect(checkbox).toBeTruthy();
      expect(checkbox.nativeElement.type).toBe('checkbox');
    });

    it('should render checkbox with data-testid attribute', () => {
      const checkbox = fixture.debugElement.query(By.css('[data-testid="toggle-all-checkbox"]'));
      expect(checkbox).toBeTruthy();
    });

    it('should render a label with correct class and text', () => {
      const label = fixture.debugElement.query(By.css('label.toggle-all-label'));
      expect(label).toBeTruthy();
      expect(label.nativeElement.textContent.trim()).toBe('Toggle All Input');
    });

    it('should have htmlFor attribute on label', () => {
      const label = fixture.debugElement.query(By.css('label.toggle-all-label'));
      expect(label.nativeElement.getAttribute('htmlFor')).toBe('toggle-all');
    });
  });

  describe('Props and State', () => {
    it('should have isChecked default to false', () => {
      expect(component.isChecked).toBe(false);
    });

    it('should render checkbox as unchecked when isChecked is false', () => {
      component.isChecked = false;
      fixture.detectChanges();
      
      const checkbox = fixture.debugElement.query(By.css('[data-testid="toggle-all-checkbox"]'));
      expect(checkbox.nativeElement.checked).toBe(false);
    });

    it('should render checkbox as checked when isChecked is true', () => {
      component.isChecked = true;
      fixture.detectChanges();
      
      const checkbox = fixture.debugElement.query(By.css('[data-testid="toggle-all-checkbox"]'));
      expect(checkbox.nativeElement.checked).toBe(true);
    });

    it('should accept isChecked as Input', () => {
      component.isChecked = true;
      fixture.detectChanges();
      
      expect(component.isChecked).toBe(true);
    });
  });

  describe('User Interactions', () => {
    it('should toggle isChecked from false to true when checkbox is clicked', () => {
      component.isChecked = false;
      fixture.detectChanges();
      
      const checkbox = fixture.debugElement.query(By.css('[data-testid="toggle-all-checkbox"]'));
      checkbox.nativeElement.dispatchEvent(new Event('change'));
      fixture.detectChanges();
      
      expect(component.isChecked).toBe(true);
    });

    it('should toggle isChecked from true to false when checkbox is clicked', () => {
      component.isChecked = true;
      fixture.detectChanges();
      
      const checkbox = fixture.debugElement.query(By.css('[data-testid="toggle-all-checkbox"]'));
      checkbox.nativeElement.dispatchEvent(new Event('change'));
      fixture.detectChanges();
      
      expect(component.isChecked).toBe(false);
    });

    it('should update checkbox checked state after toggle', () => {
      component.isChecked = false;
      fixture.detectChanges();
      
      const checkbox = fixture.debugElement.query(By.css('[data-testid="toggle-all-checkbox"]'));
      checkbox.nativeElement.dispatchEvent(new Event('change'));
      fixture.detectChanges();
      
      expect(checkbox.nativeElement.checked).toBe(true);
    });

    it('should toggle multiple times correctly', () => {
      const checkbox = fixture.debugElement.query(By.css('[data-testid="toggle-all-checkbox"]'));
      
      expect(component.isChecked).toBe(false);
      
      checkbox.nativeElement.dispatchEvent(new Event('change'));
      fixture.detectChanges();
      expect(component.isChecked).toBe(true);
      
      checkbox.nativeElement.dispatchEvent(new Event('change'));
      fixture.detectChanges();
      expect(component.isChecked).toBe(false);
      
      checkbox.nativeElement.dispatchEvent(new Event('change'));
      fixture.detectChanges();
      expect(component.isChecked).toBe(true);
    });
  });

  describe('toggleAll method', () => {
    let consoleSpy: jest.SpyInstance;

    beforeEach(() => {
      consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    });

    afterEach(() => {
      consoleSpy.mockRestore();
    });

    it('should call toggleAll method when checkbox change event fires', () => {
      const toggleAllSpy = jest.spyOn(component, 'toggleAll');
      
      const checkbox = fixture.debugElement.query(By.css('[data-testid="toggle-all-checkbox"]'));
      checkbox.nativeElement.dispatchEvent(new Event('change'));
      
      expect(toggleAllSpy).toHaveBeenCalled();
    });

    it('should log to console when toggleAll is called', () => {
      component.isChecked = false;
      component.toggleAll();
      
      expect(consoleSpy).toHaveBeenCalledWith('Toggle all:', true);
    });

    it('should log correct value when toggling from true to false', () => {
      component.isChecked = true;
      component.toggleAll();
      
      expect(consoleSpy).toHaveBeenCalledWith('Toggle all:', false);
    });

    it('should toggle isChecked when toggleAll is called directly', () => {
      component.isChecked = false;
      
      component.toggleAll();
      expect(component.isChecked).toBe(true);
      
      component.toggleAll();
      expect(component.isChecked).toBe(false);
    });
  });

  describe('Edge Cases', () => {
    it('should handle rapid toggling', () => {
      const checkbox = fixture.debugElement.query(By.css('[data-testid="toggle-all-checkbox"]'));
      
      for (let i = 0; i < 10; i++) {
        checkbox.nativeElement.dispatchEvent(new Event('change'));
        fixture.detectChanges();
      }
      
      expect(component.isChecked).toBe(false);
    });

    it('should maintain state consistency between component and view', () => {
      const checkbox = fixture.debugElement.query(By.css('[data-testid="toggle-all-checkbox"]'));
      
      component.toggleAll();
      fixture.detectChanges();
      
      expect(component.isChecked).toBe(checkbox.nativeElement.checked);
    });
  });
});