import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DestroyButtonComponent } from './destroy-button.component';

describe('DestroyButtonComponent', () => {
  let component: DestroyButtonComponent;
  let fixture: ComponentFixture<DestroyButtonComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DestroyButtonComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DestroyButtonComponent);
    component = fixture.componentInstance;
  });

  it('renders correctly', () => {
    fixture.detectChanges();
    const buttonElement = fixture.debugElement.query(By.css('[data-testid="destroy-button"]'));
    expect(buttonElement.nativeElement.textContent).toBe('');
  });

  it('calls removeTodo on click', () => {
    fixture.detectChanges();
    const buttonElement = fixture.debugElement.query(By.css('[data-testid="destroy-button"]'));
    const removeTodoSpy = jest.spyOn(component, 'removeTodo');
    buttonElement.nativeElement.click();
    expect(removeTodoSpy).toHaveBeenCalledTimes(1);
  });
});