// toggle-all-checkbox.component.spec.ts
import { TestBed } from '@angular/core/testing';
import { ToggleAllCheckboxComponent } from './toggle-all-checkbox.component';

describe('ToggleAllCheckboxComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ToggleAllCheckboxComponent],
    }).compileComponents();
  });

  it('renders correctly', () => {
    const fixture = TestBed.createComponent(ToggleAllCheckboxComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    const elem = fixture.nativeElement.querySelector('[data-testid="toggle-all-checkbox"]');
    expect(elem).toBeTruthy();
    expect(elem.checked).toBe(false);
  });

  it('toggles checkbox on click', () => {
    const fixture = TestBed.createComponent(ToggleAllCheckboxComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    const elem = fixture.nativeElement.querySelector('[data-testid="toggle-all-checkbox"]');
    elem.click();
    fixture.detectChanges();
    expect(component.isChecked).toBe(true);
  });

  it('emits change event on toggle', () => {
    const fixture = TestBed.createComponent(ToggleAllCheckboxComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    const elem = fixture.nativeElement.querySelector('[data-testid="toggle-all-checkbox"]');
    const changeEvent = new Event('change');
    elem.dispatchEvent(changeEvent);
    fixture.detectChanges();
    expect(component.isChecked).toBe(true);
  });

  it('updates checkbox state on input change', () => {
    const fixture = TestBed.createComponent(ToggleAllCheckboxComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    const elem = fixture.nativeElement.querySelector('[data-testid="toggle-all-checkbox"]');
    component.isChecked = true;
    fixture.detectChanges();
    expect(elem.checked).toBe(true);
  });

  it('logs to console on toggle', () => {
    const fixture = TestBed.createComponent(ToggleAllCheckboxComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    const elem = fixture.nativeElement.querySelector('[data-testid="toggle-all-checkbox"]');
    const consoleLogSpy = jest.spyOn(console, 'log');
    elem.click();
    fixture.detectChanges();
    expect(consoleLogSpy).toHaveBeenCalledTimes(1);
    expect(consoleLogSpy).toHaveBeenCalledWith('Toggle all:', true);
  });
});