import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FilterLinkActiveComponent } from './filter-link-active.component';

describe('FilterLinkActiveComponent', () => {
  let component: FilterLinkActiveComponent;
  let fixture: ComponentFixture<FilterLinkActiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterLinkActiveComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(FilterLinkActiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the link with correct text', () => {
    const linkElement = fixture.debugElement.query(By.css('[data-testid="filter-link-active"]'));
    expect(linkElement).toBeTruthy();
    expect(linkElement.nativeElement.textContent.trim()).toBe('Active');
  });

  it('should apply "selected" class when isSelected is true', () => {
    component.isSelected = true;
    fixture.detectChanges();
    const linkElement = fixture.debugElement.query(By.css('[data-testid="filter-link-active"]'));
    expect(linkElement.nativeElement.classList.contains('selected')).toBe(true);
  });

  it('should not apply "selected" class when isSelected is false', () => {
    component.isSelected = false;
    fixture.detectChanges();
    const linkElement = fixture.debugElement.query(By.css('[data-testid="filter-link-active"]'));
    expect(linkElement.nativeElement.classList.contains('selected')).toBe(false);
  });

  it('should call selectFilter on link click', () => {
    jest.spyOn(component, 'selectFilter');
    const linkElement = fixture.debugElement.query(By.css('[data-testid="filter-link-active"]'));
    linkElement.triggerEventHandler('click', null);
    expect(component.selectFilter).toHaveBeenCalled();
  });

  it('should log message when selectFilter is called', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    component.selectFilter();
    expect(consoleSpy).toHaveBeenCalledWith('Active filter selected');
    consoleSpy.mockRestore();
  });

  it('should have correct href attribute', () => {
    const linkElement = fixture.debugElement.query(By.css('[data-testid="filter-link-active"]'));
    expect(linkElement.nativeElement.getAttribute('href')).toBe('#/active');
  });
});