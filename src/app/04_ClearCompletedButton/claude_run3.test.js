import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClearCompletedButtonComponent } from './clear-completed-button.component';
import { By } from '@angular/platform-browser';

describe('ClearCompletedButtonComponent', () => {
  let component: ClearCompletedButtonComponent;
  let fixture: ComponentFixture<ClearCompletedButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClearCompletedButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ClearCompletedButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('rendering', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should render the button when isVisible is true (default)', () => {
      const button = fixture.debugElement.query(
        By.css('[data-testid="clear-completed-button"]')
      );
      expect(button).toBeTruthy();
    });

    it('should display "Clear Completed" text on the button', () => {
      const button = fixture.debugElement.query(
        By.css('[data-testid="clear-completed-button"]')
      );
      expect(button.nativeElement.textContent.trim()).toBe('Clear Completed');
    });

    it('should have the correct class "clear-completed"', () => {
      const button = fixture.debugElement.query(
        By.css('[data-testid="clear-completed-button"]')
      );
      expect(button.nativeElement.classList.contains('clear-completed')).toBe(true);
    });

    it('should have type="button" attribute', () => {
      const button = fixture.debugElement.query(
        By.css('[data-testid="clear-completed-button"]')
      );
      expect(button.nativeElement.getAttribute('type')).toBe('button');
    });

    it('should not render the button when isVisible is false', () => {
      component.isVisible = false;
      fixture.detectChanges();

      const button = fixture.debugElement.query(
        By.css('[data-testid="clear-completed-button"]')
      );
      expect(button).toBeNull();
    });
  });

  describe('props/inputs', () => {
    it('should have isVisible default to true', () => {
      expect(component.isVisible).toBe(true);
    });

    it('should accept isVisible input as false', () => {
      component.isVisible = false;
      fixture.detectChanges();
      expect(component.isVisible).toBe(false);
    });

    it('should accept isVisible input as true', () => {
      component.isVisible = true;
      fixture.detectChanges();
      expect(component.isVisible).toBe(true);
    });

    it('should toggle visibility when isVisible changes', () => {
      // Initially visible
      let button = fixture.debugElement.query(
        By.css('[data-testid="clear-completed-button"]')
      );
      expect(button).toBeTruthy();

      // Hide
      component.isVisible = false;
      fixture.detectChanges();
      button = fixture.debugElement.query(
        By.css('[data-testid="clear-completed-button"]')
      );
      expect(button).toBeNull();

      // Show again
      component.isVisible = true;
      fixture.detectChanges();
      button = fixture.debugElement.query(
        By.css('[data-testid="clear-completed-button"]')
      );
      expect(button).toBeTruthy();
    });
  });

  describe('user interactions', () => {
    it('should call clearCompleted method when button is clicked', () => {
      const clearCompletedSpy = jest.spyOn(component, 'clearCompleted');

      const button = fixture.debugElement.query(
        By.css('[data-testid="clear-completed-button"]')
      );
      button.nativeElement.click();

      expect(clearCompletedSpy).toHaveBeenCalled();
      expect(clearCompletedSpy).toHaveBeenCalledTimes(1);
    });

    it('should log message when clearCompleted is called', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

      component.clearCompleted();

      expect(consoleSpy).toHaveBeenCalledWith('Completed todos cleared');
      consoleSpy.mockRestore();
    });

    it('should log message when button is clicked', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

      const button = fixture.debugElement.query(
        By.css('[data-testid="clear-completed-button"]')
      );
      button.nativeElement.click();

      expect(consoleSpy).toHaveBeenCalledWith('Completed todos cleared');
      consoleSpy.mockRestore();
    });

    it('should handle multiple clicks correctly', () => {
      const clearCompletedSpy = jest.spyOn(component, 'clearCompleted');
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

      const button = fixture.debugElement.query(
        By.css('[data-testid="clear-completed-button"]')
      );

      button.nativeElement.click();
      button.nativeElement.click();
      button.nativeElement.click();

      expect(clearCompletedSpy).toHaveBeenCalledTimes(3);
      expect(consoleSpy).toHaveBeenCalledTimes(3);

      consoleSpy.mockRestore();
    });
  });

  describe('clearCompleted method', () => {
    it('should be defined', () => {
      expect(component.clearCompleted).toBeDefined();
    });

    it('should be callable', () => {
      expect(() => component.clearCompleted()).not.toThrow();
    });
  });

  describe('edge cases', () => {
    it('should handle rapid visibility toggling', () => {
      for (let i = 0; i < 10; i++) {
        component.isVisible = i % 2 === 0;
        fixture.detectChanges();

        const button = fixture.debugElement.query(
          By.css('[data-testid="clear-completed-button"]')
        );

        if (i % 2 === 0) {
          expect(button).toBeTruthy();
        } else {
          expect(button).toBeNull();
        }
      }
    });

    it('should not throw when clicking while visible', () => {
      const button = fixture.debugElement.query(
        By.css('[data-testid="clear-completed-button"]')
      );

      expect(() => button.nativeElement.click()).not.toThrow();
    });
  });
});