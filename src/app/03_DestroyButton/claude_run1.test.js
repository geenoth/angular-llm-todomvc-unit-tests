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
    jest.restoreAllMocks();
  });

  describe('Rendering', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should render a button element', () => {
      const button = fixture.nativeElement.querySelector('button');
      expect(button).toBeTruthy();
    });

    it('should have the "destroy" class on the button', () => {
      const button = fixture.nativeElement.querySelector('button');
      expect(button.classList.contains('destroy')).toBe(true);
    });

    it('should have data-testid attribute set to "destroy-button"', () => {
      const button = fixture.nativeElement.querySelector('[data-testid="destroy-button"]');
      expect(button).toBeTruthy();
    });
  });

  describe('User Interactions', () => {
    it('should call removeTodo method when button is clicked', () => {
      const removeTodoSpy = jest.spyOn(component, 'removeTodo');
      const button = fixture.nativeElement.querySelector('[data-testid="destroy-button"]');
      
      button.click();
      
      expect(removeTodoSpy).toHaveBeenCalled();
      expect(removeTodoSpy).toHaveBeenCalledTimes(1);
    });

    it('should log "Todo removed" to console when button is clicked', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      const button = fixture.nativeElement.querySelector('[data-testid="destroy-button"]');
      
      button.click();
      
      expect(consoleSpy).toHaveBeenCalledWith('Todo removed');
    });

    it('should handle multiple clicks correctly', () => {
      const removeTodoSpy = jest.spyOn(component, 'removeTodo');
      const button = fixture.nativeElement.querySelector('[data-testid="destroy-button"]');
      
      button.click();
      button.click();
      button.click();
      
      expect(removeTodoSpy).toHaveBeenCalledTimes(3);
    });
  });

  describe('Component Methods', () => {
    it('should have removeTodo method defined', () => {
      expect(component.removeTodo).toBeDefined();
      expect(typeof component.removeTodo).toBe('function');
    });

    it('should execute removeTodo without errors', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      
      expect(() => component.removeTodo()).not.toThrow();
      
      consoleSpy.mockRestore();
    });
  });

  describe('Component Structure', () => {
    it('should be a standalone component', () => {
      const componentDef = (DestroyButtonComponent as any).ɵcmp;
      expect(componentDef.standalone).toBe(true);
    });

    it('should have the correct selector', () => {
      const componentDef = (DestroyButtonComponent as any).ɵcmp;
      expect(componentDef.selectors[0][0]).toBe('app-destroy-button');
    });
  });
});