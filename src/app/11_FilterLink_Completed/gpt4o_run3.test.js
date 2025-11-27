import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilterLinkCompletedComponent } from './filter-link-completed.component';
import { By } from '@angular/platform-browser';

describe('FilterLinkCompletedComponent', () => {
  let component: FilterLinkCompletedComponent;
  let fixture: ComponentFixture<FilterLinkCompletedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterLinkCompletedComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FilterLinkCompletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render the link with the correct text', () => {
    const link = fixture.debugElement.query(By.css('[data-testid="filter-link-completed"]'));
    expect(link).toBeTruthy();
    expect(link.nativeElement.textContent.trim()).toBe('Completed');
  });

  it('should apply the "selected" class when isSelected is true', () => {
    component.isSelected = true;
    fixture.detectChanges();

    const link = fixture.debugElement.query(By.css('[data-testid="filter-link-completed"]'));
    expect(link.nativeElement.classList).toContain('selected');
  });

  it('should not have the "selected" class when isSelected is false', () => {
    component.isSelected = false;
    fixture.detectChanges();

    const link = fixture.debugElement.query(By.css('[data-testid="filter-link-completed"]'));
    expect(link.nativeElement.classList).not.toContain('selected');
  });

  it('should call selectFilter method when the link is clicked', () => {
    jest.spyOn(component, 'selectFilter');
    const link = fixture.debugElement.query(By.css('[data-testid="filter-link-completed"]'));

    link.nativeElement.click();
    expect(component.selectFilter).toHaveBeenCalled();
  });

  it('should log "Completed filter selected" when selectFilter is called', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    component.selectFilter();

    expect(consoleSpy).toHaveBeenCalledWith('Completed filter selected');
    consoleSpy.mockRestore();
  });
});