import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DestroyButtonComponent } from './destroy-button.component';
import { By } from '@angular/platform-browser';

describe('DestroyButtonComponent', () => {
  let component: DestroyButtonComponent;
  let fixture: ComponentFixture<DestroyButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DestroyButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DestroyButtonComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the destroy button', () => {
    fixture.detectChanges();
    const buttonElement = fixture.debugElement.query(By.css('.destroy')).nativeElement;
    expect(buttonElement).toBeTruthy();
  });

  it('should call removeTodo() and log "Todo removed" when button is clicked', () => {
    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
    fixture.detectChanges();

    const buttonElement = fixture.debugElement.query(By.css('.destroy')).nativeElement;
    buttonElement.click();
    fixture.detectChanges();

    expect(consoleLogSpy).toHaveBeenCalledWith('Todo removed');
    consoleLogSpy.mockRestore();
  });
});