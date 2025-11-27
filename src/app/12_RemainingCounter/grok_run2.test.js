import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RemainingCounterComponent } from './remaining-counter.component';

describe('RemainingCounterComponent', () => {
  let component: RemainingCounterComponent;
  let fixture: ComponentFixture<RemainingCounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RemainingCounterComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(RemainingCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the correct count and label for single item', () => {
    component.count = 1;
    fixture.detectChanges();

    const counterElement = fixture.nativeElement.querySelector('[data-testid="remaining-counter"]');
    expect(counterElement).toBeTruthy();
    expect(counterElement.textContent.trim()).toBe('1 item left');
  });

  it('should render the correct count and label for multiple items', () => {
    component.count = 3;
    fixture.detectChanges();

    const counterElement = fixture.nativeElement.querySelector('[data-testid="remaining-counter"]');
    expect(counterElement).toBeTruthy();
    expect(counterElement.textContent.trim()).toBe('3 items left');
  });

  it('should render the correct count and label for zero items', () => {
    component.count = 0;
    fixture.detectChanges();

    const counterElement = fixture.nativeElement.querySelector('[data-testid="remaining-counter"]');
    expect(counterElement).toBeTruthy();
    expect(counterElement.textContent.trim()).toBe('0 items left');
  });

  it('should update the display when count input changes', () => {
    component.count = 5;
    fixture.detectChanges();

    let counterElement = fixture.nativeElement.querySelector('[data-testid="remaining-counter"]');
    expect(counterElement.textContent.trim()).toBe('5 items left');

    component.count = 1;
    fixture.detectChanges();

    counterElement = fixture.nativeElement.querySelector('[data-testid="remaining-counter"]');
    expect(counterElement.textContent.trim()).toBe('1 item left');
  });

  it('should return correct label based on count value', () => {
    component.count = 1;
    expect(component.getLabel()).toBe('item');

    component.count = 2;
    expect(component.getLabel()).toBe('items');

    component.count = 0;
    expect(component.getLabel()).toBe('items');
  });
});