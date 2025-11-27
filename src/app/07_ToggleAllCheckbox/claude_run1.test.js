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

    it('should render the checkbox input with correct attributes', () => {
      const checkbox = fixture.debugElement.query(By.css('[data-testid="toggle-all-checkbox"]'));
      expect(checkbox).toBeTruthy();
      expect(checkbox.nativeElement.type).toBe('checkbox');
      expect(checkbox.nativeElement.classList.contains('toggle-all')).toBe(true);
    });

    it('should render the label with correct text', () => {
      const label = fixture.debugElement.query(By.css('.toggle-all-label'));
      expect(label).toBeTruthy();
      expect(label.nativeElement.textContent.trim()).toBe('Toggle All Input');
    });

    it('should render checkbox as unchecked by default', () => {
      const checkbox = fixture.debugElement.query(By.css('[data-testid="toggle-all-checkbox"]'));
      expect(checkbox.nativeElement.checked).toBe(false);
    });
  });

  describe('Props/Input', () => {
    it('should have isChecked default to false', () => {
      expect(component.isChecked).toBe(false);
    });

    it('should accept isChecked input as true', () => {
      component.isChecked = true;
      fixture.detectChanges();
      
      const checkbox = fixture.debugElement.query(By.css('[data-testid="toggle-all-checkbox"]'));
      expect(checkbox.nativeElement.checked).toBe(true);
    });

    it('should accept isChecked input as false', () => {
      component.isChecked = false;
      fixture.detectChanges();
      
      const checkbox = fixture.debugElement.query(By.css('[data-testid="toggle-all-checkbox"]'));
      expect(checkbox.nativeElement.checked).toBe(false);
    });

    it('should reflect isChecked changes in the DOM', () => {
      const checkbox = fixture.debugElement.query(By.css('[data-testid="toggle-all-checkbox"]'));
      
      component.isChecked = true;
      fixture.detectChanges();
      expect(checkbox.nativeElement.checked).toBe(true);
      
      component.isChecked = false;
      fixture.detectChanges();
      expect(checkbox.nativeElement.checked).toBe(false);
    });
  });

  describe('User Interactions', () => {
    it('should toggle isChecked from false to true on checkbox change', () => {
      const checkbox = fixture.debugElement.query(By.css('[data-testid="toggle-all-checkbox"]'));
      
      expect(component.isChecked).toBe(false);
      
      checkbox.nativeElement.dispatchEvent(new Event('change'));
      fixture.detectChanges();
      
      expect(component.isChecked).toBe(true);
    });

    it('should toggle isChecked from true to false on checkbox change', () => {
      component.isChecked = true;
      fixture.detectChanges();
      
      const checkbox = fixture.debugElement.query(By.css('[data-testid="toggle-all-checkbox"]'));
      
      checkbox.nativeElement.dispatchEvent(new Event('change'));
      fixture.detectChanges();
      
      expect(component.isChecked).toBe(false);
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

    it('should update checkbox checked state after toggle', () => {
      const checkbox = fixture.debugElement.query(By.css('[data-testid="toggle-all-checkbox"]'));
      
      checkbox.nativeElement.dispatchEvent(new Event('change'));
      fixture.detectChanges();
      
      expect(checkbox.nativeElement.checked).toBe(true);
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

    it('should toggle isChecked from false to true', () => {
      component.isChecked = false;
      component.toggleAll();
      expect(component.isChecked).toBe(true);
    });

    it('should toggle isChecked from true to false', () => {
      component.isChecked = true;
      component.toggleAll();
      expect(component.isChecked).toBe(false);
    });

    it('should log the toggle state when toggling to true', () => {
      component.isChecked = false;
      component.toggleAll();
      expect(consoleSpy).toHaveBeenCalledWith('Toggle all:', true);
    });

    it('should log the toggle state when toggling to false', () => {
      component.isChecked = true;
      component.toggleAll();
      expect(consoleSpy).toHaveBeenCalledWith('Toggle all:', false);
    });

    it('should be called when checkbox change event is triggered', () => {
      const toggleAllSpy = jest.spyOn(component, 'toggleAll');
      const checkbox = fixture.debugElement.query(By.css('[data-testid="toggle-all-checkbox"]'));
      
      checkbox.nativeElement.dispatchEvent(new Event('change'));
      
      expect(toggleAllSpy).toHaveBeenCalled();
    });
  });

  describe('State Changes', () => {
    it('should maintain state after multiple toggles', () => {
      component.toggleAll();
      expect(component.isChecked).toBe(true);
      
      component.toggleAll();
      expect(component.isChecked).toBe(false);
      
      component.toggleAll();
      expect(component.isChecked).toBe(true);
      
      component.toggleAll();
      expect(component.isChecked).toBe(false);
    });

    it('should sync DOM state with component state', () => {
      const checkbox = fixture.debugElement.query(By.css('[data-testid="toggle-all-checkbox"]'));
      
      component.isChecked = true;
      fixture.detectChanges();
      expect(checkbox.nativeElement.checked).toBe(true);
      expect(component.isChecked).toBe(true);
      
      component.toggleAll();
      fixture.detectChanges();
      expect(checkbox.nativeElement.checked).toBe(false);
      expect(component.isChecked).toBe(false);
    });
  });

  describe('Edge Cases', () => {
    it('should handle rapid toggle calls', () => {
      for (let i = 0; i < 10; i++) {
        component.toggleAll();
      }
      expect(component.isChecked).toBe(false);
    });

    it('should handle odd number of rapid toggle calls', () => {
      for (let i = 0; i < 11; i++) {
        component.toggleAll();
      }
      expect(component.isChecked).toBe(true);
    });
  });
});