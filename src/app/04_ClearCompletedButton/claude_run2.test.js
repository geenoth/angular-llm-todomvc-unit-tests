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

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('Component Creation', () => {
    it('should create the component', () => {
      fixture.detectChanges();
      expect(component).toBeTruthy();
    });

    it('should have isVisible default to true', () => {
      expect(component.isVisible).toBe(true);
    });
  });

  describe('Rendering', () => {
    it('should render button when isVisible is true (default)', () => {
      fixture.detectChanges();
      const button = fixture.nativeElement.querySelector('[data-testid="clear-completed-button"]');
      expect(button).not.toBeNull();
    });

    it('should display "Clear Completed" text on button', () => {
      fixture.detectChanges();
      const button = fixture.nativeElement.querySelector('[data-testid="clear-completed-button"]');
      expect(button.textContent.trim()).toBe('Clear Completed');
    });

    it('should have type="button" attribute', () => {
      fixture.detectChanges();
      const button = fixture.nativeElement.querySelector('[data-testid="clear-completed-button"]');
      expect(button.getAttribute('type')).toBe('button');
    });

    it('should have "clear-completed" CSS class', () => {
      fixture.detectChanges();
      const button = fixture.nativeElement.querySelector('[data-testid="clear-completed-button"]');
      expect(button.classList.contains('clear-completed')).toBe(true);
    });

    it('should have correct data-testid attribute', () => {
      fixture.detectChanges();
      const button = fixture.nativeElement.querySelector('[data-testid="clear-completed-button"]');
      expect(button.getAttribute('data-testid')).toBe('clear-completed-button');
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
      expect(button).not.toBeNull();
    });
  });

  describe('Input Properties', () => {
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

    it('should update visibility when isVisible changes from true to false', () => {
      component.isVisible = true;
      fixture.detectChanges();
      
      let button = fixture.nativeElement.querySelector('[data-testid="clear-completed-button"]');
      expect(button).not.toBeNull();

      component.isVisible = false;
      fixture.detectChanges();
      
      button = fixture.nativeElement.querySelector('[data-testid="clear-completed-button"]');
      expect(button).toBeNull();
    });

    it('should update visibility when isVisible changes from false to true', () => {
      component.isVisible = false;
      fixture.detectChanges();
      
      let button = fixture.nativeElement.querySelector('[data-testid="clear-completed-button"]');
      expect(button).toBeNull();

      component.isVisible = true;
      fixture.detectChanges();
      
      button = fixture.nativeElement.querySelector('[data-testid="clear-completed-button"]');
      expect(button).not.toBeNull();
    });
  });

  describe('User Interactions', () => {
    it('should call clearCompleted method when button is clicked', () => {
      fixture.detectChanges();
      const clearCompletedSpy = jest.spyOn(component, 'clearCompleted');
      
      const button = fixture.nativeElement.querySelector('[data-testid="clear-completed-button"]');
      button.click();
      
      expect(clearCompletedSpy).toHaveBeenCalled();
      expect(clearCompletedSpy).toHaveBeenCalledTimes(1);
    });

    it('should log message to console when clearCompleted is called', () => {
      fixture.detectChanges();
      const consoleSpy = jest.spyOn(console, 'log');
      
      const button = fixture.nativeElement.querySelector('[data-testid="clear-completed-button"]');
      button.click();
      
      expect(consoleSpy).toHaveBeenCalledWith('Completed todos cleared');
    });

    it('should handle multiple clicks', () => {
      fixture.detectChanges();
      const consoleSpy = jest.spyOn(console, 'log');
      
      const button = fixture.nativeElement.querySelector('[data-testid="clear-completed-button"]');
      button.click();
      button.click();
      button.click();
      
      expect(consoleSpy).toHaveBeenCalledTimes(3);
      expect(consoleSpy).toHaveBeenCalledWith('Completed todos cleared');
    });
  });

  describe('clearCompleted Method', () => {
    it('should log correct message when called directly', () => {
      const consoleSpy = jest.spyOn(console, 'log');
      
      component.clearCompleted();
      
      expect(consoleSpy).toHaveBeenCalledWith('Completed todos cleared');
    });

    it('should not throw an error when called', () => {
      expect(() => component.clearCompleted()).not.toThrow();
    });

    it('should be callable multiple times without error', () => {
      const consoleSpy = jest.spyOn(console, 'log');
      
      component.clearCompleted();
      component.clearCompleted();
      component.clearCompleted();
      
      expect(consoleSpy).toHaveBeenCalledTimes(3);
    });
  });

  describe('Edge Cases', () => {
    it('should handle rapid visibility toggling', () => {
      for (let i = 0; i < 5; i++) {
        component.isVisible = true;
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('[data-testid="clear-completed-button"]')).not.toBeNull();
        
        component.isVisible = false;
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('[data-testid="clear-completed-button"]')).toBeNull();
      }
    });

    it('should maintain button functionality after visibility toggle', () => {
      const consoleSpy = jest.spyOn(console, 'log');
      
      component.isVisible = false;
      fixture.detectChanges();
      
      component.isVisible = true;
      fixture.detectChanges();
      
      const button = fixture.nativeElement.querySelector('[data-testid="clear-completed-button"]');
      button.click();
      
      expect(consoleSpy).toHaveBeenCalledWith('Completed todos cleared');
    });

    it('should not have button in DOM when initially set to not visible', () => {
      component.isVisible = false;
      fixture.detectChanges();
      
      const buttons = fixture.nativeElement.querySelectorAll('button');
      expect(buttons.length).toBe(0);
    });
  });
});