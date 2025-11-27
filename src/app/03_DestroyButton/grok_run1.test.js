import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DestroyButtonComponent } from './destroy-button.component';

describe('DestroyButtonComponent', () => {
  let component: DestroyButtonComponent;
  let fixture: ComponentFixture<DestroyButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DestroyButtonComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(DestroyButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the destroy button', () => {
    const buttonElement = fixture.nativeElement.querySelector('[data-testid="destroy-button"]');
    expect(buttonElement).toBeTruthy();
    expect(buttonElement.classList).toContain('destroy');
  });

  it('should call removeTodo method on button click', () => {
    spyOn(component, 'removeTodo').and.callThrough();
    spyOn(console, 'log'); // Mock console.log to prevent output during test
    const buttonElement = fixture.nativeElement.querySelector('[data-testid="destroy-button"]');
    buttonElement.click();
    expect(component.removeTodo).toHaveBeenCalled();
    expect(console.log).toHaveBeenCalledWith('Todo removed');
  });
});