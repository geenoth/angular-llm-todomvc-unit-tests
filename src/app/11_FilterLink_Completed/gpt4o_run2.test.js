import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilterLinkCompletedComponent } from './filter-link-completed.component';
import { By } from '@angular/platform-browser';

describe('FilterLinkCompletedComponent', () => {
  let component: FilterLinkCompletedComponent;
  let fixture: ComponentFixture<FilterLinkCompletedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilterLinkCompletedComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FilterLinkCompletedComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the "Completed" filter link', () => {
    fixture.detectChanges();

    const linkElement = fixture.debugElement.query(By.css('[data-testid="filter-link-completed"]')).nativeElement;
    expect(linkElement).toBeTruthy();
    expect(linkElement.textContent).toBe('Completed');
  });

  it('should apply "selected" class if isSelected is true', () => {
    component.isSelected = true;
    fixture.detectChanges();

    const linkElement = fixture.debugElement.query(By.css('[data-testid="filter-link-completed"]')).nativeElement;
    expect(linkElement.classList).toContain('selected');
  });

  it('should not apply "selected" class if isSelected is false', () => {
    component.isSelected = false;
    fixture.detectChanges();

    const linkElement = fixture.debugElement.query(By.css('[data-testid="filter-link-completed"]')).nativeElement;
    expect(linkElement.classList).not.toContain('selected');
  });

  it('should call selectFilter() and log "Completed filter selected" on click', () => {
    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
    fixture.detectChanges();

    const linkElement = fixture.debugElement.query(By.css('[data-testid="filter-link-completed"]')).nativeElement;
    linkElement.click();
    fixture.detectChanges();

    expect(consoleLogSpy).toHaveBeenCalledWith('Completed filter selected');
    consoleLogSpy.mockRestore();
  });
});