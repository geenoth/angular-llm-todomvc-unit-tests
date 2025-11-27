import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilterLinkAllComponent } from './filter-link-all.component';
import { By } from '@angular/platform-browser';

describe('FilterLinkAllComponent', () => {
  let component: FilterLinkAllComponent;
  let fixture: ComponentFixture<FilterLinkAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterLinkAllComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FilterLinkAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render the link with the correct text', () => {
    const link = fixture.debugElement.query(By.css('[data-testid="filter-link-all"]'));
    expect(link).toBeTruthy();
    expect(link.nativeElement.textContent.trim()).toBe('All');
  });

  it('should apply the "selected" class when isSelected is true', () => {
    component.isSelected = true;
    fixture.detectChanges();

    const link = fixture.debugElement.query(By.css('[data-testid="filter-link-all"]'));
    expect(link.nativeElement.classList).toContain('selected');
  });

  it('should not have the "selected" class when isSelected is false', () => {
    component.isSelected = false;
    fixture.detectChanges();

    const link = fixture.debugElement.query(By.css('[data-testid="filter-link-all"]'));
    expect(link.nativeElement.classList).not.toContain('selected');
  });

  it('should call selectFilter method when the link is clicked', () => {
    jest.spyOn(component, 'selectFilter');
    const link = fixture.debugElement.query(By.css('[data-testid="filter-link-all"]'));

    link.nativeElement.click();
    expect(component.selectFilter).toHaveBeenCalled();
  });

  it('should log "All filter selected" when selectFilter is called', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    component.selectFilter();

    expect(consoleSpy).toHaveBeenCalledWith('All filter selected');
    consoleSpy.mockRestore();
  });
});