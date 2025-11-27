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
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the counter with the correct count and label (plural)', () => {
    component.count = 2;
    fixture.detectChanges();

    const counterElement = fixture.debugElement.query(
      By.css('[data-testid="remaining-counter"]')
    );
    expect(counterElement.nativeElement.textContent.trim()).toBe('2 items left');
  });

  it('should render the counter with the correct count and label (singular)', () => {
    component.count = 1;
    fixture.detectChanges();

    const counterElement = fixture.debugElement.query(
      By.css('[data-testid="remaining-counter"]')
    );
    expect(counterElement.nativeElement.textContent.trim()).toBe('1 item left');
  });

  it('should render the counter with "items" label when count is 0', () => {
    component.count = 0;
    fixture.detectChanges();

    const counterElement = fixture.debugElement.query(
      By.css('[data-testid="remaining-counter"]')
    );
    expect(counterElement.nativeElement.textContent.trim()).toBe('0 items left');
  });

  it('should return "item" for singular count in getLabel', () => {
    component.count = 1;
    expect(component.getLabel()).toBe('item');
  });

  it('should return "items" for plural count in getLabel', () => {
    component.count = 2;
    expect(component.getLabel()).toBe('items');
  });

  it('should return "items" for zero count in getLabel', () => {
    component.count = 0;
    expect(component.getLabel()).toBe('items');
  });
});