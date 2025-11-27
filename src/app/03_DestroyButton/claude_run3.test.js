import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DestroyButtonComponent } from './destroy-button.component';

/**
 * @jest-environment jsdom
 */

describe('DestroyButtonComponent', () => {
  let component: DestroyButtonComponent;
  let fixture: ComponentFixture<DestroyButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DestroyButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DestroyButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should render a button element', () => {
      const buttonElement = fixture.nativeElement.querySelector('button');
      expect(buttonElement).toBeTruthy();
    });

    it('should have the "destroy" class on the button', () => {
      const buttonElement = fixture.nativeElement.querySelector('button');
      expect(buttonElement.classList.contains('destroy')).toBe(true);
    });

    it('should have the correct data-testid attribute', () => {
      const buttonElement = fixture.nativeElement.querySelector('[data-testid="destroy-button"]');
      expect(buttonElement).toBeTruthy();
    });
  });

  describe('User Interactions', () => {
    it('should call removeTodo method when button is clicked', () => {
      const removeTodoSpy = jest.spyOn(component, 'removeTodo');
      const buttonElement = fixture.nativeElement.querySelector('[data-testid="destroy-button"]');
      
      buttonElement.click();
      
      expect(removeTodoSpy).toHaveBeenCalled();
      expect(removeTodoSpy).toHaveBeenCalledTimes(1);
    });

    it('should call removeTodo method multiple times on multiple clicks', () => {
      const removeTodoSpy = jest.spyOn(component, 'removeTodo');
      const buttonElement = fixture.nativeElement.querySelector('[data-testid="destroy-button"]');
      
      buttonElement.click();
      buttonElement.click();
      buttonElement.click();
      
      expect(removeTodoSpy).toHaveBeenCalledTimes(3);
    });

    it('should log "Todo removed" when removeTodo is called', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      const buttonElement = fixture.nativeElement.querySelector('[data-testid="destroy-button"]');
      
      buttonElement.click();
      
      expect(consoleSpy).toHaveBeenCalledWith('Todo removed');
      
      consoleSpy.mockRestore();
    });
  });

  describe('Component Method', () => {
    it('should have removeTodo method defined', () => {
      expect(component.removeTodo).toBeDefined();
      expect(typeof component.removeTodo).toBe('function');
    });

    it('should execute removeTodo without errors', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      
      expect(() => component.removeTodo()).not.toThrow();
      
      consoleSpy.mockRestore();
    });

    it('should log correct message when removeTodo is called directly', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      
      component.removeTodo();
      
      expect(consoleSpy).toHaveBeenCalledWith('Todo removed');
      expect(consoleSpy).toHaveBeenCalledTimes(1);
      
      consoleSpy.mockRestore();
    });
  });

  describe('Component Metadata', () => {
    it('should be a standalone component', () => {
      const componentDef = (DestroyButtonComponent as any).ɵcmp;
      expect(componentDef.standalone).toBe(true);
    });

    it('should have correct selector', () => {
      const componentDef = (DestroyButtonComponent as any).ɵcmp;
      expect(componentDef.selectors[0][0]).toBe('app-destroy-button');
    });
  });

  describe('DOM Structure', () => {
    it('should only contain one button element', () => {
      const buttons = fixture.nativeElement.querySelectorAll('button');
      expect(buttons.length).toBe(1);
    });

    it('should have empty button text content', () => {
      const buttonElement = fixture.nativeElement.querySelector('[data-testid="destroy-button"]');
      expect(buttonElement.textContent.trim()).toBe('');
    });
  });

  describe('Event Binding', () => {
    it('should trigger click event handler', () => {
      const removeTodoSpy = jest.spyOn(component, 'removeTodo');
      const buttonElement = fixture.nativeElement.querySelector('button');
      
      const clickEvent = new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window
      });
      
      buttonElement.dispatchEvent(clickEvent);
      fixture.detectChanges();
      
      expect(removeTodoSpy).toHaveBeenCalled();
    });
  });
});