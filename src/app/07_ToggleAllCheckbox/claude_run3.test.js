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

  afterEach(() => {
    jest.restoreAllMocks();
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

    it('should have htmlFor attribute on label', () => {
      const label = fixture.debugElement.query(By.css('.toggle-all-label'));
      expect(label.nativeElement.getAttribute('htmlFor')).toBe('toggle-all');
    });
  });

  describe('Default State', () => {
    it('should have isChecked default to false', () => {
      expect(component.isChecked).toBe(false);
    });

    it('should render checkbox as unchecked by default', () => {
      const checkbox = fixture.debugElement.query(By.css('[data-testid="toggle-all-checkbox"]'));
      expect(checkbox.nativeElement.checked).toBe(false);
    });
  });

  describe('Props/Inputs', () => {
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

    it('should update checkbox when isChecked changes from false to true', () => {
      component.isChecked = false;
      fixture.detectChanges();

      const checkbox = fixture.debugElement.query(By.css('[data-testid="toggle-all-checkbox"]'));
      expect(checkbox.nativeElement.checked).toBe(false);

      component.isChecked = true;
      fixture.detectChanges();

      expect(checkbox.nativeElement.checked).toBe(true);
    });

    it('should update checkbox when isChecked changes from true to false', () => {
      component.isChecked = true;
      fixture.detectChanges();

      const checkbox = fixture.debugElement.query(By.css('[data-testid="toggle-all-checkbox"]'));
      expect(checkbox.nativeElement.checked).toBe(true);

      component.isChecked = false;
      fixture.detectChanges();

      expect(checkbox.nativeElement.checked).toBe(false);
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

    it('should call toggleAll method when checkbox change event fires', () => {
      const toggleAllSpy = jest.spyOn(component, 'toggleAll');

      const checkbox = fixture.debugElement.query(By.css('[data-testid="toggle-all-checkbox"]'));
      checkbox.nativeElement.dispatchEvent(new Event('change'));

      expect(toggleAllSpy).toHaveBeenCalled();
      expect(toggleAllSpy).toHaveBeenCalledTimes(1);
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

  describe('toggleAll Method', () => {
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

    it('should log the correct message when toggling to true', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      component.isChecked = false;

      component.toggleAll();

      expect(consoleSpy).toHaveBeenCalledWith('Toggle all:', true);
    });

    it('should log the correct message when toggling to false', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      component.isChecked = true;

      component.toggleAll();

      expect(consoleSpy).toHaveBeenCalledWith('Toggle all:', false);
    });

    it('should log on every toggle call', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      component.isChecked = false;

      component.toggleAll();
      component.toggleAll();
      component.toggleAll();

      expect(consoleSpy).toHaveBeenCalledTimes(3);
      expect(consoleSpy).toHaveBeenNthCalledWith(1, 'Toggle all:', true);
      expect(consoleSpy).toHaveBeenNthCalledWith(2, 'Toggle all:', false);
      expect(consoleSpy).toHaveBeenNthCalledWith(3, 'Toggle all:', true);
    });
  });

  describe('State Changes', () => {
    it('should reflect state change in the DOM after toggle', () => {
      const checkbox = fixture.debugElement.query(By.css('[data-testid="toggle-all-checkbox"]'));

      expect(checkbox.nativeElement.checked).toBe(false);

      component.toggleAll();
      fixture.detectChanges();

      expect(checkbox.nativeElement.checked).toBe(true);
    });

    it('should maintain state consistency between component and DOM', () => {
      const checkbox = fixture.debugElement.query(By.css('[data-testid="toggle-all-checkbox"]'));

      for (let i = 0; i < 5; i++) {
        component.toggleAll();
        fixture.detectChanges();
        expect(checkbox.nativeElement.checked).toBe(component.isChecked);
      }
    });
  });

  describe('Edge Cases', () => {
    it('should handle rapid toggling', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

      for (let i = 0; i < 10; i++) {
        component.toggleAll();
      }

      expect(consoleSpy).toHaveBeenCalledTimes(10);
      expect(component.isChecked).toBe(false);
    });

    it('should work correctly when input is set before component initialization', async () => {
      const newFixture = TestBed.createComponent(ToggleAllCheckboxComponent);
      newFixture.componentInstance.isChecked = true;
      newFixture.detectChanges();

      const checkbox = newFixture.debugElement.query(By.css('[data-testid="toggle-all-checkbox"]'));
      expect(checkbox.nativeElement.checked).toBe(true);
    });
  });

  describe('Component Structure', () => {
    it('should be a standalone component', () => {
      const componentDef = (ToggleAllCheckboxComponent as any).ɵcmp;
      expect(componentDef.standalone).toBe(true);
    });

    it('should have the correct selector', () => {
      const componentDef = (ToggleAllCheckboxComponent as any).ɵcmp;
      expect(componentDef.selectors[0][0]).toBe('app-toggle-all-checkbox');
    });
  });
});