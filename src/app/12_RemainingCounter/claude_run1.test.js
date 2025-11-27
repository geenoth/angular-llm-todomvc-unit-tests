import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RemainingCounterComponent } from './remaining-counter.component';

/**
 * @jest-environment jsdom
 */
describe('RemainingCounterComponent', () => {
  let component: RemainingCounterComponent;
  let fixture: ComponentFixture<RemainingCounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RemainingCounterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RemainingCounterComponent);
    component = fixture.componentInstance;
  });

  describe('Component Initialization', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should have default count of 0', () => {
      expect(component.count).toBe(0);
    });
  });

  describe('Rendering', () => {
    it('should render the remaining counter with data-testid', () => {
      fixture.detectChanges();
      const element = fixture.nativeElement.querySelector('[data-testid="remaining-counter"]');
      expect(element).toBeTruthy();
    });

    it('should display count in strong tag', () => {
      component.count = 5;
      fixture.detectChanges();
      const strongElement = fixture.nativeElement.querySelector('strong');
      expect(strongElement.textContent).toBe('5');
    });

    it('should display "0 items left" when count is 0', () => {
      component.count = 0;
      fixture.detectChanges();
      const element = fixture.nativeElement.querySelector('[data-testid="remaining-counter"]');
      expect(element.textContent).toContain('0');
      expect(element.textContent).toContain('items left');
    });

    it('should display "1 item left" when count is 1', () => {
      component.count = 1;
      fixture.detectChanges();
      const element = fixture.nativeElement.querySelector('[data-testid="remaining-counter"]');
      expect(element.textContent).toContain('1');
      expect(element.textContent).toContain('item left');
    });

    it('should display "5 items left" when count is 5', () => {
      component.count = 5;
      fixture.detectChanges();
      const element = fixture.nativeElement.querySelector('[data-testid="remaining-counter"]');
      expect(element.textContent).toContain('5');
      expect(element.textContent).toContain('items left');
    });

    it('should display "100 items left" when count is 100', () => {
      component.count = 100;
      fixture.detectChanges();
      const element = fixture.nativeElement.querySelector('[data-testid="remaining-counter"]');
      expect(element.textContent).toContain('100');
      expect(element.textContent).toContain('items left');
    });
  });

  describe('getLabel method', () => {
    it('should return "item" when count is 1', () => {
      component.count = 1;
      expect(component.getLabel()).toBe('item');
    });

    it('should return "items" when count is 0', () => {
      component.count = 0;
      expect(component.getLabel()).toBe('items');
    });

    it('should return "items" when count is 2', () => {
      component.count = 2;
      expect(component.getLabel()).toBe('items');
    });

    it('should return "items" when count is greater than 1', () => {
      component.count = 10;
      expect(component.getLabel()).toBe('items');
    });

    it('should return "items" when count is negative', () => {
      component.count = -1;
      expect(component.getLabel()).toBe('items');
    });
  });

  describe('Input property changes', () => {
    it('should update display when count input changes', () => {
      component.count = 3;
      fixture.detectChanges();
      let element = fixture.nativeElement.querySelector('[data-testid="remaining-counter"]');
      expect(element.textContent).toContain('3');
      expect(element.textContent).toContain('items left');

      component.count = 1;
      fixture.detectChanges();
      element = fixture.nativeElement.querySelector('[data-testid="remaining-counter"]');
      expect(element.textContent).toContain('1');
      expect(element.textContent).toContain('item left');
    });

    it('should handle count changing from plural to singular', () => {
      component.count = 5;
      fixture.detectChanges();
      expect(component.getLabel()).toBe('items');

      component.count = 1;
      fixture.detectChanges();
      expect(component.getLabel()).toBe('item');
    });

    it('should handle count changing from singular to plural', () => {
      component.count = 1;
      fixture.detectChanges();
      expect(component.getLabel()).toBe('item');

      component.count = 2;
      fixture.detectChanges();
      expect(component.getLabel()).toBe('items');
    });
  });

  describe('Edge cases', () => {
    it('should handle large numbers', () => {
      component.count = 999999;
      fixture.detectChanges();
      const element = fixture.nativeElement.querySelector('[data-testid="remaining-counter"]');
      expect(element.textContent).toContain('999999');
      expect(element.textContent).toContain('items left');
    });

    it('should have todo-count class on span element', () => {
      fixture.detectChanges();
      const element = fixture.nativeElement.querySelector('.todo-count');
      expect(element).toBeTruthy();
    });

    it('should render span element as container', () => {
      fixture.detectChanges();
      const element = fixture.nativeElement.querySelector('span.todo-count');
      expect(element).toBeTruthy();
      expect(element.getAttribute('data-testid')).toBe('remaining-counter');
    });
  });
});