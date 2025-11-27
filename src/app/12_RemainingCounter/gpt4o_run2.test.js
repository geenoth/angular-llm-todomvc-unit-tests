import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RemainingCounterComponent } from './remaining-counter.component';
import { By } from '@angular/platform-browser';

describe('RemainingCounterComponent', () => {
  let component: RemainingCounterComponent;
  let fixture: ComponentFixture<RemainingCounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RemainingCounterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RemainingCounterComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the count and label correctly (multiple items)', () => {
    component.count = 3;
    fixture.detectChanges();

    const counterElement = fixture.debugElement.query(By.css('[data-testid="remaining-counter"]')).nativeElement;
    expect(counterElement.textContent.trim()).toBe('3 items left');
  });

  it('should render the count and label correctly (single item)', () => {
    component.count = 1;
    fixture.detectChanges();

    const counterElement = fixture.debugElement.query(By.css('[data-testid="remaining-counter"]')).nativeElement;
    expect(counterElement.textContent.trim()).toBe('1 item left');
  });

  it('should render the count with a `strong` element', () => {
    component.count = 5;
    fixture.detectChanges();

    const strongElement = fixture.debugElement.query(By.css('[data-testid="remaining-counter"] strong')).nativeElement;
    expect(strongElement.textContent).toBe('5');
  });

  it('should return "items" as label for multiple items', () => {
    component.count = 2;
    expect(component.getLabel()).toBe('items');
  });

  it('should return "item" as label for a single item', () => {
    component.count = 1;
    expect(component.getLabel()).toBe('item');
  });
});