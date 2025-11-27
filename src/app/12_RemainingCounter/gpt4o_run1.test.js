import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RemainingCounterComponent } from './remaining-counter.component';
import { By } from '@angular/platform-browser';

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

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should correctly render the default count of 0', () => {
    fixture.detectChanges();
    const counterElement = fixture.debugElement.query(By.css('[data-testid="remaining-counter"]'));
    expect(counterElement.nativeElement.textContent.trim()).toBe('0 items left');
  });

  it('should correctly render "item" label when count is 1', () => {
    component.count = 1;
    fixture.detectChanges();
    const counterElement = fixture.debugElement.query(By.css('[data-testid="remaining-counter"]'));
    expect(counterElement.nativeElement.textContent.trim()).toBe('1 item left');
  });

  it('should correctly render "items" label when count is greater than 1', () => {
    component.count = 5;
    fixture.detectChanges();
    const counterElement = fixture.debugElement.query(By.css('[data-testid="remaining-counter"]'));
    expect(counterElement.nativeElement.textContent.trim()).toBe('5 items left');
  });

  it('should update the rendering when the count input changes', () => {
    const testCounts = [0, 1, 7];
    const expectedLabels = ['0 items left', '1 item left', '7 items left'];

    testCounts.forEach((count, index) => {
      component.count = count;
      fixture.detectChanges();
      const counterElement = fixture.debugElement.query(By.css('[data-testid="remaining-counter"]'));
      expect(counterElement.nativeElement.textContent.trim()).toBe(expectedLabels[index]);
    });
  });
});