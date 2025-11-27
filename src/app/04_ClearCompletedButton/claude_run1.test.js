import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClearCompletedButtonComponent } from './clear-completed-button.component';

describe('ClearCompletedButtonComponent', () => {
  let component: ClearCompletedButtonComponent;
  let fixture: ComponentFixture<ClearCompletedButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClearCompletedButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ClearCompletedButtonComponent);
    component = fixture.componentInstance;
  });

  describe('rendering', () => {
    it('should create the component', () => {
      fixture.detectChanges();
      expect(component).toBeTruthy();
    });

    it('should render button when isVisible is true (default)', () => {
      fixture.detectChanges();
      const button = fixture.nativeElement.querySelector('[data-testid="clear-completed-button"]');
      expect(button).toBeTruthy();
      expect(button.textContent.trim()).toBe('Clear Completed');
    });

    it('should have correct button type attribute', () => {
      fixture.detectChanges();
      const button = fixture.nativeElement.querySelector('[data-testid="clear-completed-button"]');
      expect(button.getAttribute('type')).toBe('button');
    });

    it('should have correct CSS class', () => {
      fixture.detectChanges();
      const button = fixture.nativeElement.querySelector('[data-testid="clear-completed-button"]');
      expect(button.classList.contains('clear-completed')).toBe(true);
    });

    it('should not render button when isVisible is false', () => {
      component.isVisible = false;
      fixture.detectChanges();
      const button = fixture.nativeElement.querySelector('[data-testid="clear-completed-button"]');
      expect(button).toBeNull();
    });

    it('should render button when isVisible is explicitly set to true', () => {
      component.isVisible = true;
      fixture.detectChanges();
      const button = fixture.nativeElement.querySelector('[data-testid="clear-completed-button"]');
      expect(button).toBeTruthy();
    });
  });

  describe('props/inputs', () => {
    it('should have isVisible default to true', () => {
      expect(component.isVisible).toBe(true);
    });

    it('should accept isVisible input as false', () => {
      component.isVisible = false;
      expect(component.isVisible).toBe(false);
    });

    it('should accept isVisible input as true', () => {
      component.isVisible = true;
      expect(component.isVisible).toBe(true);
    });

    it('should toggle visibility when isVisible changes from true to false', () => {
      component.isVisible = true;
      fixture.detectChanges();
      let button = fixture.nativeElement.querySelector('[data-testid="clear-completed-button"]');
      expect(button).toBeTruthy();

      component.isVisible = false;
      fixture.detectChanges();
      button = fixture.nativeElement.querySelector('[data-testid="clear-completed-button"]');
      expect(button).toBeNull();
    });

    it('should toggle visibility when isVisible changes from false to true', () => {
      component.isVisible = false;
      fixture.detectChanges();
      let button = fixture.nativeElement.querySelector('[data-testid="clear-completed-button"]');
      expect(button).toBeNull();

      component.isVisible = true;
      fixture.detectChanges();
      button = fixture.nativeElement.querySelector('[data-testid="clear-completed-button"]');
      expect(button).toBeTruthy();
    });
  });

  describe('user interactions', () => {
    it('should call clearCompleted when button is clicked', () => {
      fixture.detectChanges();
      const consoleSpy = jest.spyOn(console, 'log');
      const button = fixture.nativeElement.querySelector('[data-testid="clear-completed-button"]');
      
      button.click();
      
      expect(consoleSpy).toHaveBeenCalledWith('Completed todos cleared');
      consoleSpy.mockRestore();
    });

    it('should call clearCompleted method directly', () => {
      const consoleSpy = jest.spyOn(console, 'log');
      
      component.clearCompleted();
      
      expect(consoleSpy).toHaveBeenCalledWith('Completed todos cleared');
      consoleSpy.mockRestore();
    });

    it('should handle multiple clicks', () => {
      fixture.detectChanges();
      const consoleSpy = jest.spyOn(console, 'log');
      const button = fixture.nativeElement.querySelector('[data-testid="clear-completed-button"]');
      
      button.click();
      button.click();
      button.click();
      
      expect(consoleSpy).toHaveBeenCalledTimes(3);
      consoleSpy.mockRestore();
    });

    it('should not throw error when clearCompleted is called', () => {
      expect(() => component.clearCompleted()).not.toThrow();
    });
  });

  describe('edge cases', () => {
    it('should handle rapid visibility toggling', () => {
      for (let i = 0; i < 10; i++) {
        component.isVisible = i % 2 === 0;
        fixture.detectChanges();
        const button = fixture.nativeElement.querySelector('[data-testid="clear-completed-button"]');
        if (i % 2 === 0) {
          expect(button).toBeTruthy();
        } else {
          expect(button).toBeNull();
        }
      }
    });

    it('should maintain button functionality after visibility toggle', () => {
      component.isVisible = false;
      fixture.detectChanges();
      
      component.isVisible = true;
      fixture.detectChanges();
      
      const consoleSpy = jest.spyOn(console, 'log');
      const button = fixture.nativeElement.querySelector('[data-testid="clear-completed-button"]');
      button.click();
      
      expect(consoleSpy).toHaveBeenCalledWith('Completed todos cleared');
      consoleSpy.mockRestore();
    });
  });
});