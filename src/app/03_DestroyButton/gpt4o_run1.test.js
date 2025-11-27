import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DestroyButtonComponent } from './destroy-button.component';

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

  it('should render the button with the correct attributes', () => {
    const button = fixture.nativeElement.querySelector('[data-testid="destroy-button"]');
    expect(button).toBeTruthy();
    expect(button.className).toContain('destroy');
  });

  it('should call removeTodo method when the button is clicked', () => {
    jest.spyOn(component, 'removeTodo');
    const button = fixture.nativeElement.querySelector('[data-testid="destroy-button"]');
    button.click();
    expect(component.removeTodo).toHaveBeenCalled();
  });

  it('should log "Todo removed" to the console on button click', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    const button = fixture.nativeElement.querySelector('[data-testid="destroy-button"]');
    button.click();
    expect(consoleSpy).toHaveBeenCalledWith('Todo removed');
    consoleSpy.mockRestore();
  });
});