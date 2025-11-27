import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DestroyButtonComponent } from './destroy-button.component';

describe('DestroyButtonComponent', () => {
  let component: DestroyButtonComponent;
  let fixture: ComponentFixture<DestroyButtonComponent>;
  let consoleLogSpy: jest.SpyInstance;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DestroyButtonComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    consoleLogSpy = jest.spyOn(console, 'log');
    fixture = TestBed.createComponent(DestroyButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render destroy button', () => {
    const destroyButton = fixture.debugElement.query(By.css('[data-testid="destroy-button"]'));
    expect(destroyButton.nativeElement.textContent).toBe('');
  });

  it('should call removeTodo on click', () => {
    const destroyButton = fixture.debugElement.query(By.css('[data-testid="destroy-button"]'));
    destroyButton.nativeElement.click();
    expect(consoleLogSpy).toHaveBeenCalledTimes(1);
    expect(consoleLogSpy).toHaveBeenCalledWith('Todo removed');
  });
});